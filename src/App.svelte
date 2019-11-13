<script>
import Header from "./UI/Header.svelte";
import MeetupGrid from "./Meetup/MeetupGrid.svelte";
import AddMeetup from "./Meetup/AddMeetup.svelte";
import TextInput from "./UI/TextInput.svelte";
import Button from "./UI/Button.svelte";




let edit;

let meetups = [
  {
    id:'m1',
    title: 'coding camp',
    subtitle: 'learn to code in hours not days',
    description: "what",
    imageUrl: "",
    address: "27th Nerd Road, New York NY, 11001",
    email: "blah@blah.com",
    isFavorite: false
  },
  {
    id:'m2',
    title: 'butt camp',
    subtitle: 'learn to butt',
    description: "butt",
    imageUrl: "",
    address: "69 butt Road, Boston MA, 11001",
    email: "butt@butt.com",
    isFavorite: false
  }
]

function toggleFavorite(event){
  const id = event.detail.id;
  let toUpdate = {...meetups.find(m => m.id === id)}
  toUpdate.isFavorite = !toUpdate.isFavorite
  let idx = meetups.findIndex(m => m.id === id)
  let updatedMeetups = [...meetups]
  updatedMeetups[idx] = toUpdate
  meetups = updatedMeetups
}

function addMeetup(event){
  var {id, title, subtitle, description, imageUrl, email, address} = event.detail
  const newMeetup ={
    id: Math.random().toString(),
    title: title,
    subtitle: subtitle,
    description: description,
    imageUrl: imageUrl,
    email: email,
    address: address
  }

  meetups = [newMeetup, ...meetups]
  edit = false
}




</script>

<style>
  main {
    margin-top: 5rem;
  }
  main button {
    /* align-items: center; */
    /* margin-bottom: 5rem; */
  }



</style>

<Header/>

<main>
<Button caption="Add New Meetup" on:click={()=> {edit = true}}/>
{#if !edit}
<MeetupGrid {meetups} on:togglefavorite={toggleFavorite}/>
{:else}
<AddMeetup on:cancel={()=>{edit=false}} on:saveMeetup={addMeetup}/>
 {/if}
</main>
