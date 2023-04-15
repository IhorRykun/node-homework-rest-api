const fs = require("fs/promises");
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath, "utf8");
  const data = JSON.parse(contacts);
  return data;
};

const getContactById = async (contactId) => {
  const contactsId = await listContacts();
  const result = contactsId.find((item) => item.id === contactId);
  return result || null;
};

const removeContact = async (contactId) => {
  const contact = await listContacts();
  const index = contact.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = contact.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contact, null, 2));
  return result;
};

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = {
    id: v4(),
    ...body
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  contacts[index] = { contactId, ...body };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact
};
