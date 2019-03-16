workflow "Build documentation on docs changes" {
  on = "push"
  resolves = ["Build Docs"]
}

action "If Docs Changed" {
  uses = "AndrewIngram/actions-changed-paths-filter@v0.0.1"
  args = "docs"
}

action "Build Docs" {
  uses = "nuxt/actions-yarn@node-10"
  needs = ["If Docs Changed"]
  args = "docs"
}
