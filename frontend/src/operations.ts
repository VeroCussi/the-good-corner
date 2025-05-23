import { gql } from "@apollo/client";

export const GET_ALL_ADS = gql`
  query GetAllAds($pagination: PaginationInput) {
    getAllAds(pagination: $pagination) {
      id
      title
      description
      price
      picture
      location
      owner
      createdAt
      category {
        id
        title
      }
      tags {
        id
        title
      }
    }
  }
`;

export const GET_ALL_CATEGORIES = gql`
  query GetAllCategories {
    getAllCategories {
      id
      title
    }
  }
`;

export const GET_ALL_TAGS = gql`
  query GetAllTags {
    getAllTags {
      id
      title
    }
  }
`;

export const GET_AD = gql`
  query GetAd($id: Float!) {
    getAd(id: $id) {
      id
      title
      description
      price
      picture
      location
      owner
      createdAt
      category {
        id
        title
      }
      tags {
        id
        title
      }
    }
  }
`;

export const SEARCH_ADS = gql`
  query SearchAds($searchInput: SearchInput!, $pagination: PaginationInput) {
    searchAds(searchInput: $searchInput, pagination: $pagination) {
      id
      title
      description
      price
      picture
      location
      owner
      createdAt
      category {
        id
        title
      }
      tags {
        id
        title
      }
    }
  }
`;

export const CREATE_AD = gql`
  mutation CreateAd($data: AdInput!) {
    createAd(data: $data) {
      id
      title
      description
      price
      picture
      location
      owner
      createdAt
      category {
        id
        title
      }
      tags {
        id
        title
      }
    }
  }
`;

export const UPDATE_AD = gql`
  mutation UpdateAd($id: Float!, $data: AdInput!) {
    updateAd(id: $id, data: $data) {
      id
      title
      description
      price
      picture
      location
      owner
      createdAt
      category {
        id
        title
      }
      tags {
        id
        title
      }
    }
  }
`;

export const DELETE_AD = gql`
  mutation DeleteAd($id: Float!) {
    deleteAd(id: $id)
  }
`;

export const CREATE_TAG = gql`
  mutation CreateTag($data: TagInput!) {
    createTag(data: $data)
  }
`;

export const CREATE_CATEGORY = gql`
  mutation CreateCategory($data: CategoryInput!) {
    createCategory(data: $data)
  }
`;

export const GET_ADS_BY_CATEGORY = gql`
  query GetAdsByCategory($categoryId: ID!) {
    searchAds(searchInput: { categoryId: $categoryId }) {
      id
      title
      description
      price
      picture
      location
      owner
      createdAt
      category {
        id
        title
      }
      tags {
        id
        title
      }
    }
  }
`;

export const GET_CATEGORY = gql`
  query GetCategory($id: ID!) {
    getAllCategories {
      id
      title
    }
  }
`;