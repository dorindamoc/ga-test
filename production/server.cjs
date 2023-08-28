/* eslint-disable @typescript-eslint/no-var-requires */
/**
 * Production Server for Capture web, using HAPI as server component.
 */

'use strict'

const Fs = require('fs')
const Hapi = require('@hapi/hapi')
const Inert = require('@hapi/inert')

const runServer = async () => {
    const server = new Hapi.Server({
        host: '0.0.0.0',
        port: 3000,
    })

    await server.register(Inert)
    const publicFolder = 'public_html/'
    server.route({
        method: 'GET',
        path: '/{path*}',
        handler: function (request, reply) {
            var path = request.params.path || 'index.html'
            var match

            if (path === 'oauth2callback.html') {
                return reply.file('oauth2callback.html')
            }

            if (path === 'serviceTerms.html') {
                return reply.file(publicFolder + 'serviceTerms.html')
            }

            if (path === 'undelete.html') {
                return reply.file(publicFolder + 'undelete.html')
            }

            if ((match = path.match(/^\.well-known\/([^/]+)$/))) {
                return reply.file(publicFolder + '.well-known/' + match[1])
            }

            if ((match = path.match(/([^/]+\.(js|js.map|json|webapp))$/))) {
                return reply.file(publicFolder + 'assets/' + match[1])
            }

            if ((match = path.match(/^(google[a-z0-9]+\.html)$/))) {
                return reply.file(publicFolder + match[1])
            }

            if ((match = path.match(/fonts\/(.*)/))) {
                return reply.file(publicFolder + 'fonts/' + match[1])
            }

            if ((match = path.match(/(.*\.(png|jpg|svg|ico|css))$/))) {
                return reply.file(publicFolder + match[0])
            }

            return reply.file(publicFolder + 'index.html')
        },
    })

    await server.start()
    console.log('Server running at:', server.info.uri)
}

runServer()
