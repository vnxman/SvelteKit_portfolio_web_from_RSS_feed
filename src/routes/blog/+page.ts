import { get } from 'svelte/store';
import type { PageServerLoad } from './$types';
import { blogStore, rssFeedUrls } from '$src/store/BlogStore';
import { fetchPostsFromRss } from '$src/helpers/fetch-rss-posts';
import { type RssPost, PostStatus } from '$src/types/RssXml';

export const _loadPosts = (fetch: (() => Promise<Response>) | undefined) => {
  let fetchStatus: PostStatus = PostStatus.Loading;

  // Get promise of all posts from array of RSS feeds
  const posts: Promise<RssPost[]> = fetchPostsFromRss(get(rssFeedUrls), fetch);
  // When resolved, update the store to save for later
  posts
    .then((resolvedPosts) => {
      fetchStatus = PostStatus.Ready;
      return blogStore.set(resolvedPosts)
    })
    .catch(() => {
      fetchStatus = PostStatus.Errored;
    });
  // Return post prop, to render content
  return { posts, fetchStatus };
};

/** @type {import('./$types').PageLoad} */
export const load = async ({ fetch }: PageServerLoad) => {

  if (get(blogStore)?.length > 0) {
    return { posts: get(blogStore) }
  }

  return _loadPosts(fetch);
  };

