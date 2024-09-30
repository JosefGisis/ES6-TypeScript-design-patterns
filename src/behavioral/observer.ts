/**
 * The Observer pattern (AKA Publish-Subscribe) create a one-to-many dependency between an object (usually containing data)
 * to facets that utilize the data. When the data changes, the facets (subscribers) are notified and update accordingly.
 *
 * The Observer pattern is similar to the Model - View - Controller architecture in that multiple views can share a single model,
 * but the difference being that the Controller is responsible for notifying the view and not the Model itself.
 *
 * This is also very similar to dependencies in React. React hooks that are provided a dependency are subscribed to changes in
 * the data. React dependencies also suffer from similar pitfalls to the observer pattern; that is, errors can be hard to
 * debug, and changes can cause cascading and unpredictable effects.
 */

interface MovieReviewDataType {
	id: number
	name: string
	rating: number
}
class MovieReviewData {
	private movieReviews: MovieReviewDataType[] = []
	private observers: Map<number, MoviewReviewObserver> = new Map<number, MoviewReviewObserver>()

	public getMovies() {
		return this.movieReviews
	}

	public setMovieReviews(reviews: MovieReviewDataType[]) {
		this.movieReviews = reviews
		this.notifyObservers()
	}

	public addObserver(observer: MoviewReviewObserver) {
		if (this.observers.has(observer.id)) {
			console.log('looks like this observer has already been added')
			return
		}
		this.observers.set(observer.id, observer)
	}

	protected notifyObservers() {
		this.observers.forEach((observer) => {
			observer.update()
		})
	}
}

abstract class MoviewReviewObserver {
	id: number
	protected dependency: MovieReviewData | null
	protected movieReviews: MovieReviewDataType[] = []

	constructor(id: number, dependency: MovieReviewData) {
		this.dependency = dependency
		this.id = id
	}

	abstract update(): void
}

class MovieReviewNameObserver extends MoviewReviewObserver {
	update() {
		this.movieReviews = this.dependency?.getMovies() || []
		console.log(' ')
		console.log('Movie Names:')
		this.movieReviews.map((review) => console.log(review.name))
	}
}

class MovieReviewRatingObserver extends MoviewReviewObserver {
	update() {
		this.movieReviews = this.dependency?.getMovies() || []
		console.log(' ')
		console.log('Movie Ratings:')
		this.movieReviews.map((review) => console.log(`${review.name} - Rating: ${review.rating}/10`))
	}
}

// Usage
const movieReviews = [
	{ id: 1, name: 'Django Unchained', rating: 9 },
	{ id: 2, name: 'Pulp Fiction', rating: 9 },
	{ id: 3, name: 'Kill Bill', rating: 8 },
	{ id: 4, name: 'Kill Bill 2', rating: 8 },
	{ id: 5, name: 'Jackie Brown', rating: 8 },
	{ id: 6, name: 'Inglorious Basterds', rating: 9 },
	{ id: 7, name: 'Reservoir Dogs', rating: 7 },
	{ id: 8, name: 'The Hateful Eight', rating: 8 },
	{ id: 9, name: 'Once Upon a Time in Hollywood', rating: 8 },
	{ id: 11, name: 'Death Proof', rating: 4 },
]

const movieReviewData = new MovieReviewData()
const movieReviewNameObserver = new MovieReviewNameObserver(1, movieReviewData)
movieReviewData.addObserver(movieReviewNameObserver)
const movieReviewRatingObserver = new MovieReviewRatingObserver(2, movieReviewData)
movieReviewData.addObserver(movieReviewRatingObserver)

movieReviewData.setMovieReviews(movieReviews)
movieReviewData.setMovieReviews([...movieReviews, { id: 10, name: 'From Dusk Till Dawn', rating: 3 }])
