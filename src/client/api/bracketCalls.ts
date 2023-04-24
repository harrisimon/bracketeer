import apiUrl from "./apiConfig"
import axios from "axios"
import { TournamentType } from "../../types"

export const postBracket = (data: TournamentType) => {
	return axios({
		method: "POST",
		data,
		url: apiUrl! + "/tournament",
	})
}

export const getBracket = (id: string) => {
    return axios({
        method: "GET",
        url: apiUrl! + "/tournament/" + id,
    })
}

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
