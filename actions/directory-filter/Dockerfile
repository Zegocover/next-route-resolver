FROM debian:stable-slim

LABEL "com.github.actions.name"="Change Filter for GitHub Actions"
LABEL "com.github.actions.description"="Filter based on changes against the base branch"
LABEL "com.github.actions.icon"="filter"
LABEL "com.github.actions.color"="gray-dark"

ADD entrypoint.sh /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
