<script>
import MeetupItem from "./MeetupItem.svelte";
import Filter from "../UI/filter.svelte"
import Button from "../UI/Button.svelte"
import {createEventDispatcher} from 'svelte'
import {flip} from 'svelte/animate'
export let meetups = []

let filter = false

let dispatch = createEventDispatcher()

$: filteredMeetups = filter ? meetups.filter(meetup => meetup.isFavorite) : meetups
</script>

<style>
  section {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 1rem;
  }

  @media (min-width: 768px) {
    section {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  .spacer{
    margin: 1rem;
    display: flex;
    justify-content: space-between;
  }


</style>

<div class="spacer">
  <Button caption="Add New Meetup" on:click={()=> dispatch("add")}/>
  <Filter state={filter} on:disactivate={()=> {filter = false}} on:activate={()=>{filter = true}}/>
</div>

<br/>
<section class="meetups">
  {#each filteredMeetups as meetup (meetup.id)}
  <div  animate:flip={{duration: 200}}>
    <MeetupItem on:edit on:showDetails id={meetup.id} isFavorite={meetup.isFavorite} title={meetup.title} subtitle={meetup.subtitle} description={meetup.description} imageUrl={meetup.imageUrl} email={meetup.email} address={meetup.address}/>
  </div>
  {/each}
</section>
