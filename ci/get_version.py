#!/usr/bin/env python3
import json
import sys
import argparse
import re

def get_version_string(branch_name, build_number):
    """Generate version string

    master, 997 -> 1.0.997.0
    maint-1.0.997, 4 -> 1.0.997.4
    webdev/fix-bug, 12 -> 1.0.0.0
    """
    with open("../package.json", "r") as f:
        package_json = json.loads(f.read())
    major_version, minor_version = package_json["version"].split(".")[:2]

    if branch_name == "master":
        return "{}.{}.{}.0".format(major_version, minor_version, build_number)

    m = re.match("^maint-(\d+)\.(\d+)\.(\d+)$", branch_name)
    if m:
        return "{}.{}.{}.{}".format(m.group(1), m.group(2), m.group(3), build_number)
    else:
        return "1.0.0.0"


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Generate version number from branch and build_number')
    parser.add_argument('branch_name', help='Branch name')
    parser.add_argument('build_number', type=int, help='Jenkins build number')

    args = parser.parse_args()
    print(get_version_string(args.branch_name, args.build_number))
