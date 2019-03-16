workflow "Run CI on source changes" {
  on = "push"
  resolves = ["Lint", "Test"]
}

workflow "Build documentation on docs changes" {
  on = "push"
  resolves = ["Build Docs"]
}

action "If Docs Changed" {
  uses = "AndrewIngram/actions-changed-directory-filter@master"
  args = "docs"
}

action "If Source Changed" {
  uses = "AndrewIngram/actions-changed-directory-filter@master"
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
