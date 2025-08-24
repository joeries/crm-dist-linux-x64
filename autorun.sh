sudo chmod +rw ./CRM.Log
sudo chmod +rw ./DataProtection
sudo cp crm.service /etc/systemd/system/crm.service
sudo systemctl enable crm.service
sudo systemctl restart crm.service
sudo systemctl status crm.service