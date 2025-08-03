#!/bin/bash
### BEGIN INIT INFO
# Provides:          crm.sh
# Required-Start:    $network $syslog
# Required-Stop:     $network $syslog
# Default-Start:     2 3 4 5
# Default-Stop:      0 1 6
# Short-Description: CRM Service
# Description:       Start/Stop CRM Service
### END INIT INFO
cd /opt/crm-dit-linux-x64
./CRM.UI &
