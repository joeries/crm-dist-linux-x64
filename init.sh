chmod +w ./CRM.Log
chmod +w ./wwwroot/Upload
chmod +x ./CRM.UI
cp start.sh /etc/rc.d/init.d/crm.sh
cd /etc/rc.d/init.d
chmod +x crm.sh
chkconfig --add crm.sh
chkconfig crm.sh on
#firewall-cmd --permanent --add-port=80/tcp
#firewall-cmd --reload