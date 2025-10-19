# github-actions-playground

A repository containing experements and showcases related to GitHub actions

## Tools required for some showcases in the project

### asdf

[asdf](https://asdf-vm.com/guide/getting-started.html) is a tool version manager similar to nvm but not only for nodejs (like nvm is).

Install asdf with [go install](https://dev.to/pu-lazydev/installing-go-golang-on-wsl-ubuntu-18b7):
```bash
go install github.com/asdf-vm/asdf/cmd/asdf@v0.18.0
# add to your ~/.bashrc
export PATH="${ASDF_DATA_DIR:-$HOME/.asdf}/shims:$PATH"

# check available plugins
asdf  plugin list all --urls
```

### nodejs

```bash
# install nodejs plugin for asdf
asdf plugin add nodejs https://github.com/asdf-vm/asdf-nodejs.git

# list all available versions
asdf list all nodejs

# install a need version
asdf install nodejs latest
asdf install nodejs 20.19.5


# list installed versions
asdf list nodejs

# set a version
asdf set -u nodejs 20.19.5
```

### create react app

```
# navigate to a target folder and run
npx create-react-app --template typescript react-app.
```