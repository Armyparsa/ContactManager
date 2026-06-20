class Contact {
  constructor (firstName, lastName, phoneNumber, address, email, group, createdAt){
    this.firstName = firstName;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
    this.address = address;
    this.email = email;
    this.group = group;
    this.createdAt = new Date();
  }
}

let contacts = [];

function loadContact(){
  let loadParse = localStorage.getItem("save");
  if(loadParse){
    contacts = JSON.parse(loadParse);
    contacts.forEach(f => {
      f.createdAt = new Date(f.createdAt);
    });
  }else{
    contacts = [];
  }
}

function saveContact(){
  let saveStringify = JSON.stringify(contacts);
  localStorage.setItem("save", saveStringify);

}

function addContact(){
  let firstName = prompt("Enter FirstName: ");
  let lastName = prompt("Enter LastName: ");
  let phoneNumber = prompt("Enter PhoneNumber: ");
  let address = {
    street: prompt("Enter Street Name: "),
    city: prompt("Enter City: "),
    zipCode: prompt("Enter zipCode: ")
  }
  let email = prompt("Enter You'r Email: ");
  let group = prompt("Creat a Group: ");
  let newContact = new Contact (firstName, lastName, phoneNumber, address, email, group);
  contacts.push(newContact);
  saveContact();
}

function displayContact(){
  if(contacts.length === 0){
    console.log("You Don't Have Any Contacts Yet.");
  }
  console.log("--- You'r Contacts ---");

  let displayLine = contacts.map((contact, index) => {
    return `${index + 1}.${contact.firstName} ${contact.lastName}: Phone ${contact.phoneNumber}\nAddress ${contact.address.street} ${contact.address.city} ${contact.address.zipCode}\nEmail ${contact.email}\nGroup ${contact.group}`
  })

  displayLine.map(line => console.log(line));
}

function searchContact(){
  let searching = prompt("Searching For...");

  let search = contacts.filter(user => user.firstName.toLowerCase().includes(searching.toLowerCase)||
  user.lastName.toLowerCase().includes(searching.toLowerCase()) || user.group.toLowerCase().includes(searching.toLowerCase()));

  if(search.length === 0){
    console.log("No contacts in this group!");
  }else{
    console.log(`${search.length} Contact Was Found!`);
    search.map(contact => console.log(`${contact.firstName} ${contact.lastName}`));
  }
}

function sortContact(){
  let sort = prompt("In What Order You Want To Sort You'r Contact's: ");
  let lowerSort = sort.toLowerCase();
  switch(lowerSort){
    case 'name':
      contacts.sort((a,b) => a.firstName.localeCompare(b.firstName));
      console.log("Sorted By FirstName!");
      break;
    case 'date':
      contacts.sort((a,b) => b.createdAt - a.createdAt);
      console.log("Sorted By Date!");
      break;
    case 'group':
      contacts.sort((a,b) => a.group.localeCompare(b.group));
      console.log("Sorted By Group!");
      break;
    default: console.log("Please Enter Valid Option.");
    break;
  }
  saveContact();
}

  function showStats() {
    let total = contacts.length;
    console.log(`Total Contacts: ${total}`);

    let groups = [];
    contacts.map(contact => {
        if (!groups.includes(contact.group)) {
            groups.push(contact.group);
        }
    });

    groups.map(group => {
        let count = contacts.filter(c => c.group === group).length;
        console.log(`   - ${group}: ${count} contact(s)`);
    });
}

function editContact(){
  let Edit = prompt("Enter Index Of Contact To Edit: ");
  let numIndex = parseInt(Edit);
    if(numIndex >= 0 && numIndex < contacts.length){
      contacts[numIndex].firstName = prompt("Enter New FirstName: ");
      contacts[numIndex].lastName = prompt("Enter New LastName: ");
      contacts[numIndex].phoneNumber = prompt("Enter New PhoneNumber: ");
      contacts[numIndex].address = {
        street: prompt("Enter Street Name: "),
        city: prompt("Enter City Name: "),
        zipCode: prompt("Enter zipCode: ")
      }
      contacts[numIndex].email = prompt("Enter New Email: ");
      contacts[numIndex].group = prompt("Enter New Group: ");
      console.log("Contact Updated!");
    }else{
      console.log("Enter Valid Index.");
    }
    saveContact();
  }

function deleteContact(){
  let Delete = prompt("Enter Index Of Contact To Remove: ");
  let Numindex = parseInt(Delete)
    if(Numindex >= 0 && Numindex < contacts.length){
      console.log(`Contact ${Numindex} Has Been Removed.`);
      contacts.splice(Numindex, 1);
    }else{
      console.log("You Don't Have Any Contact To Remove.");
  }
  saveContact();
}

loadContact();

let running = true;
while(running){
  let option = prompt("What You Want To Do: ");
  switch(option){
    case '1':
      addContact();
      break;
    case '2':
      displayContact();
      break;
    case '3':
      searchContact();
      break;
    case '4':
      sortContact();
      break;
    case '5':
      showStats();
      break;
    case '6':
      editContact();
      break;
    case '7':
      deleteContact();
      break;
    case '8':
      console.log("Thank You For Useing My App!");
      running = false;
      break;
    default: console.log("Please Enter Valid Number.");
  }
}