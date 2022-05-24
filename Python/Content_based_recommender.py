from sklearn.neighbors import NearestNeighbors
from sklearn.preprocessing import MaxAbsScaler
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import re

anime = pd.read_csv("animes.csv")
# print(anime.head())
anime.loc[(anime["genre"] == "Hentai") & (
    anime["episodes"] == ""), "episodes"] = "1"
anime["episodes"] = anime["episodes"].map(lambda x: np.nan if x == "" else x)
anime["episodes"].fillna(anime["episodes"].median(), inplace=True)
anime["score"] = anime["score"].astype(float)
anime["score"].fillna(anime["score"].median(), inplace=True)
anime["members"] = anime["members"].astype(float)

# anime["title"] = anime["title"].map(
#     lambda title: re.sub('[^A-Za-z0-9]+', " ", title))
# print(anime_features.head())
# print(anime_features.columns)
anime_features = pd.concat([anime["genre"].str.get_dummies(
    sep=","), anime[["score"]], anime[["members"]], anime["popularity"]], axis=1)


max_abs_scaler = MaxAbsScaler()
anime_features = max_abs_scaler.fit_transform(anime_features)
nbrs = NearestNeighbors(
    n_neighbors=8, algorithm='ball_tree').fit(anime_features)
distances, indices = nbrs.kneighbors(anime_features)


def get_index_from_name(title):
    return anime[anime["title"] == title].index.tolist()[0]

# print(get_index_from_name("Naruto"))
# print(distances[144])
# print(indices[144])


queryArr = ["Naruto", "One Piece"]

def get_similar_animes(query):
    recArr=np.array([])
    found_id = get_index_from_name(query)
    for uid in indices[found_id][2:]:
        recArr=np.append(recArr, anime.loc[uid]["title"])
    return recArr

recommendations=np.array([])
for i in queryArr:
    recommendations=np.append(recommendations,get_similar_animes(i))

result=recommendations.flatten()
result=np.unique(result)
print(result)
