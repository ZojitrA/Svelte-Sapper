import {writable} from 'svelte/store';

export const Meetups = writable([])

export const MeetupStore = {
  subscribe: Meetups.subscribe,
  editMeetup: (deets)=>{
    console.log("edit")
    Meetups.update(data => {
    // let idx = data.findIndex(m => m.id === deets.id)
    //
    // let toEdit = {...data[idx], ...deets}
    // let updatedMeetups = [...data]
    // updatedMeetups[idx] = toEdit
    // return updatedMeetups
    return data.map(obj => {

      if(obj.id === deets.id){
        return {...obj, ...deets}
      }
    }
  )
})},
  deleteMeetup: (id)=>{
    Meetups.update(data => {
    let idx = data.findIndex(m => m.id === id)
    data.splice(idx, 1)
    return data
  })
  },
  addMeetup: (deets) => {
    console.log(deets)
    var {id, title, subtitle, description, imageUrl, email, address} = deets
    const newMeetup ={
      id: id,
      title: title,
      subtitle: subtitle,
      description: description,
      imageUrl: imageUrl,
      email: email,
      address: address,
      isFavorite: false
    }
    Meetups.update(data => [newMeetup, ...data])
  },
  toggleFavorite: (id)=>{
    Meetups.update(data => {
    let toUpdate = data.find(m => m.id === id)
    toUpdate.isFavorite = !toUpdate.isFavorite
    let idx = data.findIndex(m => m.id === id)
    let updatedMeetups = [...data]
    updatedMeetups[idx] = {...toUpdate}
    return updatedMeetups
  })
}
}
