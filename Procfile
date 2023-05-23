web: gunicorn djapp.wsgi --chdir backend --limit-request-line 8188 --log-file -
worker: REMAP_SIGTERM=SIGQUIT celery --workdir backend --app=djapp worker --loglevel=info
beat: REMAP_SIGTERM=SIGQUIT celery --workdir backend --app=djapp beat -S redbeat.RedBeatScheduler --loglevel=info
