import {writable} from 'svelte/store';

export const Meetups = writable([
  {
    id:'m1',
    title: 'coding camp',
    subtitle: 'learn to code in hours not days',
    description: "what",
    imageUrl: "blah",
    address: "27th Nerd Road, New York NY, 11001",
    email: "blah@blah.com",
    isFavorite: false
  },
  {
    id:'m2',
    title: 'butt camp',
    subtitle: 'learn to butt',
    description: "butt",
    imageUrl: "blah",
    address: "69 butt Road, Boston MA, 11001",
    email: "butt@butt.com",
    isFavorite: false
  }
])

export const MeetupStore = {
  subscribe: Meetups.subscribe,
  editMeetup: (deets)=>{
    Meetups.update(data => {
    let idx = data.findIndex(m => m.id === deets.id)
    let toEdit = {...data[idx], ...deets}
    let updatedMeetups = [...data]
    updatedMeetups[idx] = toEdit
    return updatedMeetups
  })
  },
  deleteMeetup: (id)=>{
    Meetups.update(data => {
    let idx = data.findIndex(m => m.id === id)
    data.splice(idx, 1)
    return data
  })
  },
  addMeetup: (deets) => {
    var {id, title, subtitle, description, imageUrl, email, address} = deets
    const newMeetup ={
      id: Math.random().toString(),
      title: title,
      subtitle: subtitle,
      description: description,
      imageUrl: imageUrl,
      email: email,
      address: address
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
