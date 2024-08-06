'use client'
import Image from "next/image";
import { useState, useEffect } from "react"; //state and client side 
import { fireStore } from "@/firebase"; //fire database
import { Box, Modal, Button,  Stack, TextField, Typography } from "@mui/material";
import {collection, getDocs, getDoc, setDoc, query, doc, deleteDoc} from "firebase/firestore";

export default function Home() {
  const [inventory, setInventory] = useState([]) //setting these two variables to an empty array. used to store inventory 
  const [open, setOpen] = useState(false); //used to add and remove items
  const [itemName, setItemName] = useState('')

  //fetching database from firebase
  const updateInventory = async() => { //makes it async so that our code doesnt pause and wait till the function is done running
    const snapshot = query(collection(fireStore, 'inventory'))
    const docs = await getDocs(snapshot)
    const inventoryList = []
    docs.forEach(doc => {
      inventoryList.push({
        name : doc.id,
        ...doc.data(),
      })
    })
    setInventory(inventoryList)
    console.log(inventoryList)
  }

  const removeItem = async(item)=>{ 
    const docRef = doc(collection(fireStore, 'inventory'), item)
    const docSnap = await getDoc(docRef) // Use getDoc for single document
    if (docSnap.exists()){
      const {quantity} = docSnap.data()
      if (quantity === 1){
        await deleteDoc(docRef)
      } 
      else{
        await setDoc(docRef, {quantity: quantity - 1})
      }
    }
    await updateInventory()
  }
  

  const addItem = async(item)=>{ //checks if item exists, if it does and equals one it deletes it and if its more than one is subtracts the quantity
    const docRef = doc(collection(fireStore, 'inventory'), item)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()){
      const {quantity} = docSnap.data()
      await setDoc(docRef, {quantity: quantity + 1})
    } else {
      await setDoc(docRef, {quantity: 1})
    }
    await updateInventory()
  }
  
  useEffect(()=>{ //will only use the code above when something in the inventory changes
    updateInventory()
  }, [])

  const handleOpen =  () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <Box 
    width ="100vw" 
    height="100vh" 
    display="flex" 
    flexDirection="column"
    justifyContent="center" 
    alignItems="center" 
    gap={2}>
      <Modal open={open} onClose={handleClose}>
        <Box 
        position="absolute" 
        top="50%" 
        left="50%" 
        sx={{transform: 'translate(-50%, -50%)'}}
        width={400}
        bgcolor="white"
        border="2px solid #000"
        boxShadow={24}
        p={4}
        display="flex"
        flexDirection="column"
        gap={3}
        > 
          <Typography variant="h6">Add Item</Typography>
          <Stack width ="100%" direction="row" spacing={2}>
            <TextField
            variant="outlined"
            fullWidth
            value={itemName}
            onChange={(e)=>{setItemName(e.target.value )}}> 
            </TextField>
            <Button 
            variant="outlined" 
            onClick={()=>{
              addItem(itemName)
              setItemName('')
              handleClose()  
            }}>Add</Button>
          </Stack>
        </Box>
      </Modal> 
      <Button variant="contained" onClick={()=>{handleOpen()}}>Add New Item</Button>
      <Box border="1px solid #000">
        <Box width="800px" height="100px" bgcolor="#ADD8E6" display="flex" alignItems ="center" justifyContent ="center">
          <Typography variant="h2" color="#333">
            Inventory Items
          </Typography>
        </Box>
      
      <Stack width="800px" height="300px" spacing={2} overflow="auto">
        {
          inventory.map(({name, quantity}) => (
            <Box key={name} width="100%" minHeight="150px" display="flex" alignItems="center" justifyContent="space-between" bgcolor="#f0f0f0" padding={5}>
              <Typography variant="h3" color="#333" textAlign="center">
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </Typography>
              <Typography variant="h3" color="#333" textAlign="center">
                {quantity}
              </Typography>
              <Stack direction="row" spacing={2}>
                <Button variant="contained" onClick={ ()=>{addItem(name)}}>Add</Button>
                <Button variant="contained" onClick={ ()=>{removeItem(name)}}>Remove</Button>
              </Stack>
            </Box>
          ))
        }
      </Stack>
      </Box>
    </Box>


  )
}
 