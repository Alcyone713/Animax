from sklearn.neighbors import NearestNeighbors
from sklearn.preprocessing import MaxAbsScaler
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import re
import sys
import json

# The link to the dataset must be respective to the NodeJS route and not the script itself!
anime = pd.read_csv("../Python/animes.csv")

#For animes with unknown episodes, I filled with the median value
anime["episodes"] = anime["episodes"].map(lambda x: np.nan if x == "" else x)
anime["episodes"].fillna(anime["episodes"].median(), inplace=True)

#Converting the score value from float
anime["score"] = anime["score"].astype(float)
anime["score"].fillna(anime["score"].median(), inplace=True)

#Converting members value to float
anime["members"] = anime["members"].astype(float)

#Concatinating all the parameters into a single table
anime_features = pd.concat([anime["genre"].str.get_dummies(
    sep=","), anime[["score"]], anime[["members"]], anime["popularity"], anime["episodes"]], axis=1)


max_abs_scaler = MaxAbsScaler()

# The values in anime_features can have a wide range, while score has a range 1-10, members might be in millions, 
# So I used the MaxAbsScalar to to scale the values from 0-1 while also preserving the sparsity.
anime_features = max_abs_scaler.fit_transform(anime_features)

# KNN for finding similar animes, where k=6, and algoritm is ball-tree (a tree based data-structure, which gives the most accurate results)
# Time complexity of ball-tree algorithm: O(Dlog(N)), where D is dimensions and N is the size of dataset 
nbrs = NearestNeighbors(
    n_neighbors=6, algorithm='ball_tree').fit(anime_features)
distances, indices = nbrs.kneighbors(anime_features)

#Getting the index of the anime, this will be used to handle IndexError
def get_index(id):
    return anime[anime["uid"] == id].index.tolist()[0]


## I have used anime_id to get the list of recommendations, which will be parsed in the frontend to make requests to the 
## external API, but for demonstration purposes I am leaving a commented function to get recommendations by name.

# def get_index_from_name(title):
#     return anime[anime["title"]==title].index.tolist()[0]

##Sample query array to get recommendations by name

# queryArr = ["Naruto", "One Piece",
#             "Boku no Hero Academia", "Death Note", "lksdjfskl"]

##Getting the input from the NodeJS backend
queryArr= sys.argv[1]

##The input we are getting is in the form of JSON, so we need to convert it to an array of numbers for it to be processed
# removing the opening and closing brackets 
queryArr = queryArr.replace("[", "")
queryArr = queryArr.replace("]", "")
#removing all the empty space
queryArr = queryArr.replace(" ", "")
#splitting the array on comma
queryArr=queryArr.split(",")

# The above array will be an array of strings, we need to convert each string to integer
for i in range(0, len(queryArr)):
    queryArr[i] = int(queryArr[i])


# the function to get similar animes, basically, we are appending "indices" in to an array
def get_similar_animes(query):
    recArr = np.array([])

    ##if the input is not found in the dataset, it will be replaces by id=5114, an input which is definitey in the list,
    ## and what, in my opinion, will be liked by everyone
    try:
        found_id = get_index(query)
        # found_id = get_index_by_name(query)   //to get recommendations by name
    except IndexError:
        found_id = 5114

    ##appending 'indices' into an array
    for uid in indices[found_id][2:]:
        recArr = np.append(recArr, anime.loc[uid]["uid"])
    return recArr

    ## To get recommendations by name
    # for uid in indices[found_id][2:]:
    #     recArr = np.append(recArr, anime.loc[uid]["title"])
    # return recArr


#this is the array to concat all the recommendations from all the input, basically we're running the 
##get_similar_animes function for all the entries in the input
recommendations = np.array([])
for i in queryArr:
    recommendations = np.append(recommendations, get_similar_animes(i))

##converting the recommendations array to one dimensional array
result = recommendations.flatten()

##removing the duplicates
result = np.unique(result)

##converting a numpy array to list, because lists are JSON seriazible while numpy arrays are not
results = result.tolist()

##printing the array and sending it to NodeJS
print(results)
