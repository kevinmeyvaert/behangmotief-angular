import { gql } from 'apollo-angular';

export const SEARCH_QUERY = gql`
  query Search($all: String) {
    posts: postSearch(photographerSlug: "kevin-meyvaert", all: $all) {
      data {
        id
        slug
        artist {
          name
        }
        venue {
          name
        }
        thumbnail {
          blurhash
          hires
        }
      }
    }
  }
`;

export const ALBUM_QUERY = gql`
  query Album($slug: String) {
    post(slug: $slug) {
      date
      thumbnail {
        resized(width: 1200, height: 800)
        photographer {
          firstName
        }
      }
      id
      url
      artist {
        name
      }
      venue {
        name
      }
      event {
        name
      }
      images {
        blurhash
        hires
        dimensions {
          width
          height
        }
        photographer {
          firstName
        }
      }
    }
  }
`;