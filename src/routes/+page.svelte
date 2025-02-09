<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { config } from '$src/store/BlogStore';
  import Loading from '$src/components/Loading.svelte';
  import Heading from '$src/components/Heading.svelte';
  import { socialNetworks } from '$src/helpers/constants';
  import Icon from '$src/components/Icon.svelte';

  export const { routeLinks } = config;

  export let showLoader = false;

  const homePageLinks = routeLinks.filter(rl => rl.route !== '/');

  onMount(async () => {
    document.querySelector('#funky-background-script')?.remove();
    var script = document.createElement('script');
    script.src = '/wobble.js';
    script.id = 'funky-background-script';
    document.head.appendChild(script);
	});

  const socialLinks = () => {
    const userSocials = Object.keys(config.contact.socials);
    const limit = config.contact.socialButtonLimit; 
    return userSocials.slice(0, limit).map((social) => {
      const socialProps = socialNetworks.find((sn) => sn.name === social);
      if (!socialProps) return null;
      const user = config.contact.socials[social];
      return {
        ...socialProps,
        user,
        href: socialProps.link + user,
        title: `${socialProps.noAt ? '' : '@'}${user} on ${socialProps.name}`,
      };
    });
  };

  // onDestroy(async () => {
  //   document.querySelector('#funky-background-script')?.remove();
  // });

  const findRouteColor = (route: string) => {
    return routeLinks?.find((r) => r.route === route)?.color || 'var(--accent)';
  };
</script>

<canvas id="canvas"></canvas>

<main class="homepage">

<div class="hero">
  <Heading level="h1" commandStyle={false} blinkCursor={true} size="4rem" color="var(--foreground)">Alicia Sykes</Heading>
  <div class="socials">
    {#each socialLinks() as social}
      {#if social}
        <a href={social.href} class="social-link" title={social.title} target="_blank">
          <Icon name={social.icon} color="var(--foreground)" width="1.8rem" height="1.8rem" hoverColor={social.tone} />
        </a>
      {/if}
    {/each}
  </div>
</div>

{#if showLoader}
  <Loading message="Pre-fetching Posts" />
{/if}

{#if !showLoader}
  <div class="tiles">
    {#each homePageLinks as navLink }
    <a
      class="tile"
      href={navLink.route}
      style={`--accent: ${findRouteColor(navLink.route)};`}
      on:click={() => { showLoader = true; }}
    >
      <Heading level="h3" size="2rem" color="currentcolor">{navLink.label}</Heading>
      <p class="subtitle">{navLink.description}</p>
    </a>
    {/each}
  </div>
{/if}

</main>

<style lang="scss">
@import "$src/styles/media-queries.scss";

:global(html) {
  scroll-behavior: smooth;
}

canvas {
  position: absolute;
  width: 100vw;
  height: 100vh;
}

*:not(canvas){
  z-index: 1;
}

main.homepage {
  min-height: 99vh;
}

.hero {
  text-align: center;
  // background: var(--card-background);
  // border-bottom: var(--card-border);
  min-height: 30vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  h1 {
    font-size: 4rem;
    cursor: default;
  }
  .socials {
    opacity: 0.85;
    .social-link {
      text-decoration: none;
    }
    &:hover {
      opacity: 1;
    }
  }
}

.tiles {
  display: grid;
  grid-auto-flow: dense;
  max-width: 70rem;
  margin: auto;
  padding: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 1rem;
  width: 80vw;
  @include tablet-down {
    display: flex;
    flex-direction: column;
  }
  a.tile {
    color: var(--foreground);
    border: var(--card-border);
    background: var(--card-background);
    border-radius: 4px;
    text-decoration: none;
    padding: 1rem;
    border-left: 4px solid var(--accent);
    transition: all ease-in-out 0.25s, transform ease-in-out 0.3s;
    overflow: hidden;

    p.subtitle {
      position: absolute;
      color: var(--dimmed-text);
      margin: 0;
      transform: translateX(-20rem) translateY(2rem) scale(0.5) rotate(5deg);
      transition: all ease-in-out 0.2s;
      opacity: 0;
    }
    
    &:hover {
      :global(h3) {
        color: var(--accent);
        transform: translateY(-1rem);
      }
      border-left-width: 8px;
      transform: scale(1.02);
      p.subtitle {
        transform: translateX(0) translateY(-1.5rem) scale(1) rotate(0);
        opacity: 1;
      }
    }
  }
}

</style>
