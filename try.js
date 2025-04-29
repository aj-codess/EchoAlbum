const properties = [
    {
      id: 1,
      name: "Luxury Villa",
      location: "Accra",
      price: 250000,
      description: "A luxurious villa in Accra",
      owner_id: 1,
      created_at: new Date("2022-01-01T12:00:00.000Z"),
    },
    {
      id: 2,
      name: "Beach House",
      location: "Cape Coast",
      price: 320000,
      description: "A beautiful beach house in Cape Coast",
      owner_id: 2,
      created_at: new Date("2022-02-01T14:00:00.000Z"),
    },
    {
      id: 3,
      name: "Mountain Retreat",
      location: "Aburi",
      price: 180000,
      description: "A serene mountain retreat in Aburi",
      owner_id: 1,
      created_at: new Date("2022-03-01T10:00:00.000Z"),
    },
];
  
  
  const users_dummy_db = [
    { id: 1, name: "John Doe", email: "johndoe@example.com" },
    { id: 2, name: "Jane Smith", email: "janesmith@example.com" },
  ];
  
  

const requestSimulator=(reqObj)=>{
    try{
      switch(reqObj.method){
       case "GET":
          if(reqObj.url=="/properties"){
            getProperties();
          } else if(reqObj.url=="/properties/id"){
           const property_id=reqObj.id;
           getProperties(property_id);
          }
        break;
       case "POST":
          if(reqObj.url=="/properties"){
               const data=reqObj.properties_data;
                 createProperty(data);
             } else if(reqObj.url=="/users"){
               const user_data=reqObj.user_data;
                createUser(user_data);
             };
        break;
      }
    } catch(error){
     console.log("Internal Error Occured");
    }
}



const getProperties=(id)=>{
 
  if(!id){
   return properties;
  }
 
  const properties=properties.find((p)=>p.id==id);
 
  if(!properties){
   return "No property found";
  };
 
  return properties;
 
};



const createProperty=(data)=>{
  
};


const createUser=(data)=>{
  const obj={id:user.length++,name:data.name,email:data.email};
  user.push(obj);
};