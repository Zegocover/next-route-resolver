workflow "Run CI on source changes" {
  on = "push"
  resolves = ["Lint", "Test"]
}

workflow "Build documentation on docs changes" {
  on = "push"
  resolves = ["Build Docs"]
}

action "If Docs Changed" {
  uses = "AndrewIngram/actions-changed-directory-filter@1b839009e80e1a62b7ab7ac6dd3546f78d9d39b2"
  args = "docs"
}

action "If Source Changed" {
  uses = "AndrewIngram/actions-changed-directory-filter@1b839009e80e1a62b7ab7ac6dd3546f78d9d39b2"
  args = "src"
}

action "Install dependencies" {
  uses = "nuxt/actions-yarn@node-10"
  needs = ["If Source Changed"]
  args = "install"
}

action "Test" {
  uses = "nuxt/actions-yarn@node-10"
  needs = ["Install dependencies"]
  args = "test"
}

action "Lint" {
  uses = "nuxt/actions-yarn@node-10"
  needs = ["Install dependencies"]
  args = "lint"
}

action "Build Docs" {
  uses = "nuxt/actions-yarn@node-10"
  needs = ["If Docs Changed"]
  args = "docs"
}
