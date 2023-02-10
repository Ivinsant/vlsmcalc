$(document).ready(function() {
    $('.show_ip').click(function() {
      $('.ip-list-container').toggle();
    });
    $('.copy-btn').click(function() {
      var copyText = "";
      $('.ip-list').each(function() {
        copyText += $(this).text() + "\n";
      });
      navigator.clipboard.writeText(copyText);
      alert("IP List Copied! You can paste it to your text editor.");
    });
  });
 
 
  function validateForm() {
    var ip_address = document.getElementById("ip_address").value;
    var class_choice = document.getElementById("class_choice").value;

    if (!validateIP(ip_address, class_choice)) {
      return false;
    }

    return true;
  }
      
  function validateIP(ip_address, class_choice) {
    // Check if the IP address is a valid IPv4 address
    if (!/^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/.test(ip_address)) {
      alert("Invalid IP address format");
      return false;
    }
    
    // Check if the IP address matches the selected network class
    var octets = ip_address.split(".");
    if (class_choice === "Class A") {
      if (octets[0] < 1 || octets[0] > 126) {
        alert("IP address doesn't match the selected network class");
        return false;
      }
    } else if (class_choice === "Class B") {
      if (octets[0] < 128 || octets[0] > 191) {
        alert("IP address doesn't match the selected network class");
        return false;
      }
    } else {
      if (octets[0] < 192 || octets[0] > 223) {
        alert("IP address doesn't match the selected network class");
        return false;
      }
    }
    return true;
  }
  
  const subnetMaskOptions = {
    'Class A': [
      { value: '255.255.255.252', prefix: '/30' },
      { value: '255.255.255.248', prefix: '/29' },
      { value: '255.255.255.240', prefix: '/28' },
      { value: '255.255.255.224', prefix: '/27' },
      { value: '255.255.255.192', prefix: '/26' },
      { value: '255.255.255.128', prefix: '/25' },
      { value: '255.255.255.0', prefix: '/24' },
      { value: '255.255.254.0', prefix: '/23' },
      { value: '255.255.252.0', prefix: '/22' },
      { value: '255.255.248.0', prefix: '/21' },
      { value: '255.255.240.0', prefix: '/20' },
      { value: '255.255.224.0', prefix: '/19' },
      { value: '255.255.192.0', prefix: '/18' },
      { value: '255.255.128.0', prefix: '/17' },
      { value: '255.255.0.0', prefix: '/16' },
      { value: '255.254.0.0', prefix: '/15' },
      { value: '255.252.0.0', prefix: '/14' },
      { value: '255.248.0.0', prefix: '/13' },
      { value: '255.240.0.0', prefix: '/12' },
      { value: '255.224.0.0', prefix: '/11' },
      { value: '255.192.0.0', prefix: '/10' },
      { value: '255.128.0.0', prefix: '/9' },
      { value: '255.0.0.0', prefix: '/8' },
      // ...
    ],
    'Class B': [
      { value: '255.255.255.252', prefix: '/30' },
      { value: '255.255.255.248', prefix: '/29' },
      { value: '255.255.255.240', prefix: '/28' },
      { value: '255.255.255.224', prefix: '/27' },
      { value: '255.255.255.192', prefix: '/26' },
      { value: '255.255.255.128', prefix: '/25' },
      { value: '255.255.255.0', prefix: '/24' },
      { value: '255.255.254.0', prefix: '/23' },
      { value: '255.255.252.0', prefix: '/22' },
      { value: '255.255.248.0', prefix: '/21' },
      { value: '255.255.240.0', prefix: '/20' },
      { value: '255.255.224.0', prefix: '/19' },
      { value: '255.255.192.0', prefix: '/18' },
      { value: '255.255.128.0', prefix: '/17' },
      { value: '255.255.0.0', prefix: '/16' },
    ],
    'Class C': [
    { value: '255.255.255.252', prefix: '/30' },
      { value: '255.255.255.248', prefix: '/29' },
      { value: '255.255.255.240', prefix: '/28' },
      { value: '255.255.255.224', prefix: '/27' },
      { value: '255.255.255.192', prefix: '/26' },
      { value: '255.255.255.128', prefix: '/25' },
      { value: '255.255.255.0', prefix: '/24' },
      // ...
    ],
  };
  
  function updateSubnetMaskOptions(classChoice) {
    const select = document.querySelector('#prefix_length');
    select.innerHTML = '';
    subnetMaskOptions[classChoice].forEach((option) => {
      const optionElement = document.createElement('option');
      optionElement.value = option.value;
      optionElement.text = `${option.value} ${option.prefix}`;
      select.appendChild(optionElement);
    });
  }
  
  updateSubnetMaskOptions('Class A');