npmdeps:
  cmd.run:
    - name: npm install && /vagrant/node_modules/.bin/bower install
    - user: vagrant
    - group: vagrant
    - cwd: /vagrant

devaliases:
  file.append:
    - name: /home/vagrant/.bashrc
    - text:
      - "alias grunt='node /vagrant/node_modules/.bin/grunt'"
      - "alias bower='node /vagrant/node_modules/.bin/bower'"
