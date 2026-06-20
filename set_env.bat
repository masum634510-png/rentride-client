@echo off
for /F "usebackq tokens=1,* delims==" %%A in (".env.production.vercel") do (
    echo Setting %%A...
    npx vercel env add %%A production --value "%%B" --yes
)
echo All env variables set!
