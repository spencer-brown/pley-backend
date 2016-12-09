#!/bin/bash

# Creates new applications within Open Shift Origin using the `oc` command line tool.
#
# The specified GitHub URL is used to fetch application code. Applications are created with the specified
# subdomain as <subdomain>.usb.cs.purdue.edu. The passed user ID is associated with the created application
# as a label so that stats fetched for applications can be scoped by user by passing the `-l` flag.
#
# Usage:
# ./make-new-app <GitHub URL> <desired subdomain (eg. 'foobar')> <Pley dashboard user ID>
#
# eg.
#	./make-new-app https://github.com/spencer-brown/contact-bump contact-bump 2304awoeijf23i2


# Confirm that all arguments are present.
if [ -z $1 ] || [ -z $2 ] || [ -z $3 ]; then
	echo Some arguments are missing. Exiting with status code 1.
	exit 1
fi

# Gather arguments.
GIT_URL=$1
SUBDOMAIN=$2
USER_ID=$3

# Validate GitHub URL. Kinda. It's good enough for now.
if [[ ! $GIT_URL =~ ^http[s]?://github\.com/.*/.*/?$ ]]; then
	echo The passed GitHub URL appears to be invalid. Exiting with status code 1.
	exit 1;
fi

# TODO: Validate subdomain?

# Generate a random name for the application so that it does not conflict with the names of other apps.
APP_NAME=$(cat /dev/urandom | tr -dc 'a-z' | fold -w 15 | head -n 1)

# Run commands.
oc new-app $GIT_URL --name=$APP_NAME --labels=userId=$USER_ID
oc expose service $APP_NAME --hostname=$SUBDOMAIN.usb.cs.purdue.edu

# Assume success.
exit 0
