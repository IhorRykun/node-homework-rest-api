const fs = require("fs/promises");
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath, "utf8");
  const data = JSON.parse(contacts);
  return data;
};

const getContactById = async (id) => {
  const contactsId = await listContacts();
  const result = contactsId.find((item) => item.id === id);
  return result || null;
};

const removeContact = async (id) => {
  const contact = await listContacts();
  const index = contact.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }
  const [result] = contact.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contact, null, 2));
  return result;
};

const addContact = async (body) => {
  const contacts = await listContacts();
  const { name, email, phone } = body;
  const newContact = {
    id: v4(),
    name: name,
    email: email,
    phone: phone
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

const updateContact = async (id, body) => {
  const allContacts = await listContacts();
  const contactIndex = allContacts.findIndex((contact) => contact.id === id);
  if (contactIndex !== -1) {
    const updateContact = { id, ...allContacts[contactIndex], ...body };
    allContacts[contactIndex] = updateContact;
    await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
    return updateContact;
  }
  return null;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact
};
