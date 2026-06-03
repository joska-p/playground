#!/usr/bin/env bash
pgrep -x sshd >/dev/null || sudo /usr/sbin/sshd
exec /bin/zsh
