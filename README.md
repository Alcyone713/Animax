
# Animax

This is an Anime recommendation application where you can 
create your profile, read about any animes, add them to your completed list or watchlist, and the best part....it gives you
recommendations based on the animes you have in your completed list!

![App Screenshot](Animax/frontend/src/Assets/logo.png)


## Build and deploy locally

Clone the project

```bash
  git clone https://github.com/Alcyone713/Animax
```

Go to the project directory

```bash
  cd Animax
```

Install dependencies

```bash
## run the commands in the given order to install all the dependencies
  cd frontend
  yarn install
  cd ..
  cd Backend
  npm install
  cd ..
  cd Python
  pip install -r requirements.txt
```

Start the server

```bash
## run the following commands right after the above commands to run the app
  cd ..
  cd frontend
  yarn start
  cd ..
  cd Backend
  nodemon app
```


## Environment Variables

To run this project, you will need to add the following environment variables to a .env file in the backend folder.

`MONGO_URI` : Genrate a MongoDB URI from MongoDB Atlas or your local MongoDB compass

`JWT_KEY` : Any random string (ex. zxcvbnmm)

`PYTHON_PATH` : Path to the python environment in your local machine



## Demo

Insert gif or link to demo


## Motivation
We all love anime, some of our favorite stories, characters and worlds come from anime. However, there is a problem with the current state of the medium.

There is so much new anime coming out each season that whatever is the most popular at the moment completely dominates the conversation in the community and as a result a lot of older and incredible, anime is forgotten, even if they came out just a couple of months ago.

This system uses algorithms, to give people qualitative recommendations based on shows they previously watched, without putting much weight into how recent the recommended shows are. This way people get good recommendations and there is also a better chance for older anime to shine.
## Recommendation systems
A recommendation engine is a type of data filtering tool using machine learning algorithms to recommend the most relevant items to a particular user or customer. It operates on the principle of finding patterns in consumer behavior data, which can be collected implicitly or explicitly.

During the last few decades, with the rise of Youtube, Amazon, Netflix and many other such web services, recommender systems have taken more and more place in our lives. From e-commerce (suggest to buyers articles that could interest them) to online advertisement (suggest to users the right contents, matching their preferences), recommender systems are today unavoidable in our daily online journeys.

### Recommendation systems  are majorly of two types :
#### Collaborative filtering: 
*Collaborative filtering* filters information by using the interactions and data collected by the system from other users. It's based on the idea that people who agreed in their evaluation of certain items are likely to agree again in the future.
Most collaborative filtering systems apply the so-called similarity index-based  technique. In the neighborhood-based approach, a number of users are selected based on their similarity to the active user.

#### Content-based filtering
A recommendation system based on *content-based filtering* provides recommendations to the user by analyzing the description of the content that has been rated by the user. In this method, the algorithm is trained to understand the context of the content and find similarities in other content to recommend the same class of content to a particular user.




![App Screenshot](https://miro.medium.com/max/1064/1*mz9tzP1LjPBhmiWXeHyQkQ.png)


## Why I decided to use Content-based filtering?

![App Screenshot](https://ars.els-cdn.com/content/image/1-s2.0-S0950705118302107-gr1.jpg)

* The model doesn't need any data about other users, since the recommendations are specific to this user. This makes it easier to scale to a large number of users.

* The model can capture the specific interests of a user, and can recommend niche items that very few other users are interested in.

* It does not suffer from the problem of "cold-start".

## K-Nearest Neighbors (KNN) Algorithm

*K-nearest neighbors (KNN) algorithm* is a type of supervised ML algorithm which can be used for both classification as well as regression predictive problems. However, it is mainly used for classification predictive problems in industry.

The following two properties would define KNN well −
- *Lazy learning algorithm* − KNN is a lazy learning algorithm because it does not have a specialized training phase and uses all the data for training while classification.
- *Non-parametric learning algorithm* − KNN is also a non-parametric learning algorithm because it doesn’t assume anything about the underlying data.

### Algorithms to implement KNN
#### Brute Force
The most naive neighbor search implementation involves the brute-force computation of distances between all pairs of points in the dataset: for  samples in  dimensions, this approach scales as O(DN^2) . Efficient brute-force neighbors searches can be very competitive for small data samples. However, as the number of samples  grows, the brute-force approach quickly becomes infeasible.

Time complexity: O(DN^2)
#### KD tree
To address the computational inefficiencies of the brute-force approach, a variety of tree-based data structures have been invented. One of which is the KD tree data structure (short for K-dimensional tree), which generalizes two-dimensional Quad-trees and 3-dimensional Oct-trees to an arbitrary number of dimensions. The KD tree is a binary tree structure which recursively partitions the parameter space along the data axes, dividing it into nested orthotropic regions into which data points are filed.

Time complexity: O(Dlog(N)) for small dataset and O(DN) for large dataset

#### Ball-tree
To address the inefficiencies of KD Trees in higher dimensions, the ball tree data structure was developed. Where KD trees partition data along Cartesian axes, ball trees partition data in a series of nesting hyper-spheres. This makes tree construction more costly than that of the KD tree, but results in a data structure which can be very efficient on highly structured data, even in very high dimensions.

Time complexity: O(Dlog(N))


**I used ball-tree algorithm in my code**
## About the Source code
### Tech Stacks used:
**Recommendation System** : Python3

**Frontend** : ReactJS

**Server** : NodeJS, ExpressJS

**Database** : MongoDB Atlas

### Other Resources used: 
**Dataset** : [Kaggle](https://www.kaggle.com/datasets/marlesson/myanimelist-dataset-animes-profiles-reviews)

**External API** : [Jikan API](https://jikan.moe/)

**REST API Testing** : Postman

**NPM Package to connent Python to NodeJS** : Python-Shell

### Challenges I faced
* One of the biggest challenge I faced is that the external API I am using to get information about animes only allows 3 requests/second and 60 requests/min. This was a particular problem in making the searchbar because nobody types 1 letter per second. To overcome this, I made a recursive function to call the API again in case an error occurs.
* Second issue is that the dataset I am using was last updated in 2020 (it was the latest relevent one I could find), so if someone inputs an anime that was released after 2020, the whole algorithm crashes. To overcome this, I added a try catch block where on occurance of IndexError, I am manually setting the input to a data that I am sure is in the list. This might give some false results but it prevents the algorithm from crashing.
* To connect python to NodeJS, I used python-shell npm package. I sent the input array to the python script as a JSON, and since there is no JSON.parse() in python, I had to convert my JSON input to an integer array manually by removing the openeing and closing brackets, spliting the array using ',' and turning each string to number.

***More information can be found in the comments***




