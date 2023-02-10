from flask import Flask, request, render_template
import ipaddress

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        ip_address = request.form['ip_address']
        subnet_mask = request.form['prefix_length']
        subnet = ipaddress.IPv4Network(ip_address + '/' + subnet_mask, False)
        hexadecimal_ip = hex(int(subnet.network_address))
        wildcard_mask = str(subnet.hostmask)
        subnet_id = str(subnet.network_address)
        broadcast_address = str(subnet.broadcast_address)
        subnet_range = str(subnet.network_address) + ' - ' + str(subnet.broadcast_address)
        host_range = str(subnet.network_address + 1) + ' - ' + str(subnet.broadcast_address - 1)
        subnet_bitmap = subnet.with_prefixlen
        usable_hosts = subnet.num_addresses - 2
        total_hosts = subnet.num_addresses
        gateway_ip = str(subnet.network_address + 1)
        host_address_range = [str(host) for host in subnet.hosts()]
        return render_template('result.html', hexadecimal_ip=hexadecimal_ip, wildcard_mask=wildcard_mask, subnet_id=subnet_id, broadcast_address=broadcast_address, subnet_range=subnet_range, subnet_bitmap=subnet_bitmap, host_range=host_range, usable_hosts=usable_hosts, total_hosts=total_hosts, ip_address=ip_address, subnet_mask=subnet_mask, gateway_ip=gateway_ip, host_address_range=host_address_range)
    return render_template('index.html')

if __name__ == '__main__':
    app.run()
