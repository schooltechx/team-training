#!/bin/bash
if [ $# -ne 6 ]; then
  echo 1>&2 "Usage: $0 hostname realm username clientid verify_ssl https"
  echo 1>&2 "Example: ./keycloak-curl.sh keycloak.local sso dev2 express-client n n" 
  echo 1>&2 "Note: verify_ssl not 'y' will send  --insecure with curl"
  exit
fi
HOSTNAME=$1
REALM_NAME=$2
USERNAME=$3
CLIENT_ID=$4
SECURE=$5
HTTPS=$6
if [[ $HTTPS = 'y' ]]; then
	PROTO=https
else 
	PROTO=http
fi
KEYCLOAK_URL=$PROTO://$HOSTNAME/realms/$REALM_NAME/protocol/openid-connect/token
echo "Using Keycloak: $KEYCLOAK_URL"
echo "realm: $REALM_NAME"
echo "client-id: $CLIENT_ID"
echo "username: $USERNAME"
echo "secure: $SECURE"
if [[ $SECURE = 'y' ]]; then
	INSECURE=
else 
	INSECURE=--insecure
fi
echo -n Password: 
read -s PASSWORD
export TOKEN=$(curl -X POST "$KEYCLOAK_URL" "$INSECURE" \
 -H "Content-Type: application/x-www-form-urlencoded" \
 -d "username=$USERNAME" \
 -d "password=$PASSWORD" \
 -d 'grant_type=password' \
 -d "client_id=$CLIENT_ID" | jq -r '.access_token')

echo $TOKEN

if [[ $(echo $TOKEN) != 'null' ]]; then
	export KEYCLOAK_TOKEN=$TOKEN
fi