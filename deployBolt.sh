yarn dev
env GOOS=linux GOARCH=amd64 go build -o ./alertlens-solr/boltanalytics-backend-plugin_linux_amd64 ./pkg 
env GOOS=darwin GOARCH=amd64 go build -o ./alertlens-solr/boltanalytics-backend-plugin_darwin_amd64 ./pkg
cp -r alertlens-solr/* /usr/local/var/lib/grafana/plugins/bolt-react-plugin/
brew services restart grafana
