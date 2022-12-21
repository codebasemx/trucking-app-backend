const { child, getDatabase, push, ref, set, update } = require('firebase/database')
const admin = require("firebase-admin");

const serviceAccount = require("./titan-trucking-app-firebase-adminsdk-cwf97-259b884d1b.json")

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://titan-trucking-app-default-rtdb.firebaseio.com"
});

/* DATABASE REF */
const db = admin.database();

const addCustomers = async () => {
  const customersRef  = ref(db, `customers/`)

  const customerRef   = push(customersRef)
  await set(customerRef, {
    companyName: "Colorado Asphalt Services, Inc",
    companyPhone: "123-456-7890",
    companyAddress: {
      line1: "Colorado Asphalt Services, Inc.",
      line2: "5230 Quail Street",
      city: "Wheat Ridge",
      state: "CO",
      zip: "80033-2302"
    }
  })

  const customerContacts = child(customerRef, `contacts`)
  const contactRef = push(customerContacts)
  set(contactRef, {
    name: "Michael Turner",
    phone: "571-623-8800",
    email: "michael@codebase.mx"
  })
}

const addEquipment = async () => {
  const equipmentsRef = ref(db, `equipment/`)

  const equipmentRef  = push(equipmentsRef)
  await set(equipmentRef, {
    purchaseDate: null,
    equipmentType: "Trailer",
    description: "1989 Peterbilt",
    companyOwned: true,
    axels: 3,
    serialNumber: "1XPFDB9X9KD271207",
    isActive: true,
    primaryDriverId: null,
    secondaryDriverId: null,
    rate: 200,
  })
}

const addItems = async () => {
  const itemsRef  = ref(db, `items/`)

  const itemRef   = push(itemsRef)
  await set(itemRef, {
    weight: 54000,
    equipmentType: "Trailer",
    description: "Vogele Super 2000",
    type: "TRAILER",
    make: "Vogele",
    model: "Super 2000"
  })
}

const addUsers = async () => {
  const usersRef  = ref(db, `users/`)

  const userRef = push(usersRef)
  await set(userRef, {
    firstName: "Juan",
    lastName: "Maldonado",
    photoUrl: "",
    isDriver: true
  })

}

const addOrders = async () => {
  const ordersRef  = ref(db, `orders/`)

  const orderRef   = push(ordersRef)
  await set(orderRef, {
    pickupDate: "",
    dateCreated: "",
    isComplete: false,
    info: {
      customerId: "-NJjzOM24PkHToAnh-RD",
      notes: {
      },
      type: "L"
    },
    drivers: {
    },
    equipment: {
      "-NJk4et-qHr23ByR8zkr": true
    },
    items: {
      "-NJk4et21Js4NfFYjNv_": {
        quantity: 1
      }
    },
    invoice: {
      quickbooksId: ""
    }
  })

  //Create loads to order...
  const loadsRef  = ref(db, `loads/`)
  const loadRef   = push(loadsRef)

  await set(loadRef, {
    locationText: "",
    orderId: orderRef.key,
    equipmentId: "-NJk4et-qHr23ByR8zkr",
    startDate: "",
    endDate: "",    //For equipment availability
    dispatched: true,
    drivers: {
      //TODO
    },
  })
}

addUsers()
addEquipment()
addItems()
addOrders()
