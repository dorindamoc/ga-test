#!/usr/bin/env python3
import subprocess
import os
import sys
import random
import argparse
import signal


CYPRESS_COMPOSE_FILE = "docker-compose.cypress.yml"


def run_image(image, artifact, long_tests, baseurl):
    """Run docker-compose with image and clean-up on failure"""
    # Use random names to avoid conflict if run in parallel
    compose_project_name = "".join(
        [random.choice("0123456789abcdef") for i in range(20)]
    )
    cypress_container_name = "cypress-" + "".join(
        [random.choice("0123456789abcdef") for i in range(14)]
    )

    env = os.environ.copy()
    env["IMAGE"] = image
    env["CYPRESS_TAG"] = image.split(":")[-1]
    env["ARTIFACT"] = artifact
    env["COMPOSE_PROJECT_NAME"] = compose_project_name
    env["CYPRESS_PROJECT"] = f"products/{artifact}"

    # Verify that image exists locally to avoid trying to pull unknown image
    try:
        subprocess.check_output(["docker", "image", "inspect", image])
    except Exception:
        print("Docker image not found locally")
        sys.exit(1)

    # Build cypress image
    subprocess.check_call(
        f"docker-compose -f {CYPRESS_COMPOSE_FILE} build".split(), env=env
    )

    exitcode = 0
    try:
        # Run tests
        dev_tests = f"--spec './products/{artifact}/cypress/e2e/dev/*.spec.ts'"
        nightly_tests = f"--spec './products/{artifact}/cypress/e2e/nightly/*.spec.ts'"
        run_tests_command = f'/usr/bin/time -po /e2etime.log cypress run {nightly_tests if long_tests else dev_tests} --browser chrome --config baseUrl=http://redux-test:3000{baseurl},defaultCommandTimeout=20000 --project products/{artifact}'
        subprocess.check_call(
            f"docker-compose -f {CYPRESS_COMPOSE_FILE} run --name {cypress_container_name} cypress {run_tests_command}".split(),
            env=env,
        )

        # Extract test timing
        subprocess.call(
            "docker cp {}:/e2etime.log ./e2etime-{}.log".format(
                cypress_container_name, artifact
            ).split()
        )
        print(
            "Test timing copied to {}/e2etime-{}.log".format(
                os.path.abspath("."), artifact
            )
        )
    except subprocess.CalledProcessError as e:
        # Test failed
        exitcode = e.returncode
        print("Error running tests. Exit code {}".format(exitcode))

        # Extract video and screenshots
        subprocess.call(
            "docker cp {}:/workdir/products/{}/cypress/videos .".format(
                cypress_container_name, artifact
            ).split()
        )
        print("Video of tests copied to {}".format(os.path.abspath("./videos")))
        subprocess.call(
            "docker cp {}:/workdir/products/{}/cypress/screenshots .".format(
                cypress_container_name, artifact
            ).split()
        )
        print("Screenshots copied to {}".format(
            os.path.abspath("./screenshots")))
    finally:
        # Clean up
        subprocess.check_call(
            f"docker-compose -f {CYPRESS_COMPOSE_FILE} down".split(), env=env
        )

    # Exit with exitcode determined by test outcome
    sys.exit(exitcode)


def build_redux(artifact, baseurl):
    redux_image_name = "".join(
        [random.choice("0123456789abcdef") for i in range(20)])
    subprocess.check_call(
        "docker build --build-arg artifact={} --build-arg baseurl={} . -t {}".format(
            artifact, baseurl, redux_image_name
        ).split()
    )
    return redux_image_name


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Run cypress tests with a pre-built CaptureRedux image"
    )
    action = parser.add_mutually_exclusive_group(required=True)
    action.add_argument(
        "--image", help="Pre-built CaptureRedux docker image name")
    action.add_argument(
        "--build", help="Build from current working tree", action="store_true"
    )
    parser.add_argument(
        "--artifact",
        help="Specify which artifact to build and test",
        default="captureWeb",
    )
    parser.add_argument(
        "--baseurl",
        help="Base url for redux image",
        default="/",
    )
    parser.add_argument("--long", help="Run long tests", action="store_true")
    args = parser.parse_args()

    # Handle SIGTERM gracefully as PID 1 in docker
    signal.signal(signal.SIGTERM, lambda _signal_number,
                  _stack_frame: sys.exit(1))

    if args.image:
        run_image(args.image, args.artifact, args.long, args.baseurl)
    elif args.build:
        image_name = build_redux(args.artifact, args.baseurl)
        run_image(image_name, args.artifact, args.long, args.baseurl)
