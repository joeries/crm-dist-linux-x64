sudo cp crm.service /etc/systemd/system/crm.service
sudo systemctl enable crm.service
sudo systemctl start crm.service
sudo systemctl status crm.service