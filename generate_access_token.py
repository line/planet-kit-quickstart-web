import sys
import datetime
import jwt 

import re

def is_valid_user_id(user_id):
    pattern = r'^[a-zA-Z0-9\-_]{1,64}$'
    if re.match(pattern, user_id):
        return True
    else:
        return False



if len(sys.argv) < 2:
    print("Usage: python generate_access_token.py <user_id>")
    sys.exit(1)


user_id = sys.argv[1]


if is_valid_user_id(user_id) == False:
    print("Error: user_id is in invalid format. See https://docs.lineplanet.me/overview/glossary#user-id")
    sys.exit(1)


service_id = "planet-kit-quick-start"
api_key = "D9dw36HlwCw0LWCqfpolZ3D1Igj-BpIBI4hB9mFA6lN0rlP0dtm7DvMFIRZdyHHIttIQvaX6gBBrluEnGpVLs0eii7dsXvI9mvhkeOi_HMa5ZqAOpjEcIbZJjGdBWjzZrV7w09QUvqU3OwPKEEM8gOQvCjELpg"
api_secret = "623af07393311ac6e1cacf9cfc04cbb72991f6acd3b160a641c044a562e68295"

headers = {
    "typ": "JWT"
}

issued_at = datetime.datetime.utcnow()

token = jwt.encode(
    payload={
        "sub": service_id,
        "uid": user_id,
        "iss": api_key,
        "iat": issued_at,
    },
    key=api_secret,
    algorithm="HS256",
    headers=headers
)

print("access token: ", token)