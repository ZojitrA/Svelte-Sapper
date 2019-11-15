<script>
import Header from "./UI/Header.svelte";
import MeetupGrid from "./Meetup/MeetupGrid.svelte";
import AddMeetup from "./Meetup/AddMeetup.svelte";
import TextInput from "./UI/TextInput.svelte";
import Button from "./UI/Button.svelte";
import {MeetupStore, Meetups} from "./stores/meetups.js"
import Details from './Meetup/MeetupDetails.svelte'
import {onDestroy} from 'svelte'



let edit;
let meetups = []
let meetId = null
let editId = null
let page = "overview";
let filter = false

let unsubscribe = Meetups.subscribe(data => {
  // if(filter === "active"){
  //   meetups = data.filter(meetup => meetup.isFavorite)
  // }else{

    meetups = data
  // }
})

onDestroy(()=>{
  unsubscribe()
})

function activateFilter(){
  filter = true
  // meetups = meetups.filter(meetup => meetup.isFavorite)
}
function disactivateFilter(){
  filter = false
}


function saveMeetup(event){
  let deets = event.detail
  if(deets.id){
    MeetupStore.editMeetup((deets))
  }else{

    MeetupStore.addMeetup(deets)
  }


  // meetups = [newMeetup, ...meetups]
  page = "overview"
  editId = null
}

function deleteMeetup(event){
  let id = event.detail
  MeetupStore.deleteMeetup(id)
  page = "overview"
  editId = null
}

function detailsPage(event){
  page = "details"
  meetId = event.detail
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

  .active {
    background-color: lightgrey;
  }


</style>


<main>
<Header/>
{#if page === "overview"}
  <Button caption="Add New Meetup" on:click={()=> {page = 'edit'}}/>
  <Button {filter} caption="Favorites Only" on:click={activateFilter}/>
  <Button filter={!filter} caption="AllMeetups" on:click={disactivateFilter}/>
  <MeetupGrid on:edit={(event)=>{page='edit'; editId = event.detail}} on:showDetails={detailsPage} meetups={filter ? meetups.filter(meetup => meetup.isFavorite) : meetups}/>

{:else if page === "edit"}
  <AddMeetup id={editId} on:delete={deleteMeetup} on:cancel={()=>{page = "overview"}} on:saveMeetup={saveMeetup}/>

{:else if page === "details"}
  <Details on:close={()=>{page = "overview"}} id={meetId}/>
<!-- {:else if page === 'edit'}
  <AddMeetup on:delete={deleteMeetup} editMode="true" id={editId} on:cancel={()=>{page = "overview"}} on:saveMeetup={editMeetup}/> -->
{/if}
</main>
