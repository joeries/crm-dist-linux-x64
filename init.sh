chmod +w ./CRM.Log
chmod +w ./wwwroot/Upload
chmod +x ./CRM.UI
cp start.sh /etc/init.d/crm.sh
cd /etc/init.d
chmod +x crm.sh
systemctl enable crm