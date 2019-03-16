FROM debian:stable-slim

LABEL "com.github.actions.name"="Change Filter for GitHub Actions"
LABEL "com.github.actions.description"="Filter based on changes against the base branch"
LABEL "com.github.actions.icon"="filter"
LABEL "com.github.actions.color"="gray-dark"

RUN apt-get update && \
    apt-get install --no-install-recommends -y \
        git-all && \
	apt-get clean -y && \
    rm -rf /var/lib/apt/lists/*

ADD entrypoint.sh /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
