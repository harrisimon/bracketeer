import apiUrl from "./apiConfig"
import axios from "axios"
import { ContestantsPostType } from "../../types"

export const postBracket = (data: ContestantsPostType) => {
	return axios({
		method: "POST",
		data,
		url: apiUrl! + "/tournament",
	})
}

export const getBracket = (id: string) => {
  return axios({
    method: 'GET',
    url: apiUrl! + '/tournament/' + id,
  });
};

export const deleteBracket = (id: string) => {
  return axios({
    method: 'DELETE',
    url: apiUrl! + '/tournament/' + id,
  });
};

// export const getAllBrackets = (user) => {
//     return axios({
//         method:'GET',
//         // api url
//     })
// }

// createBracket

// deleteBracket

// patchBracket ({ object info to patch})

// add votes, advance contestants
