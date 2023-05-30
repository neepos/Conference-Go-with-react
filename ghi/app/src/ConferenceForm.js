import React, {useEffect, useState} from 'react'

function ConferenceForm(props) {
    const [name, setName] = useState('')
    const [starts, setStarts] = useState('')
    const [ends, setEnds] = useState('')
    const [description, setDescription] = useState('')
    const [maxPresentations, setMaxPresentations] = useState('')
    const [maxAttendees, setMaxAttendees] = useState('')
    const [location, setLocation] = useState('')
    const [locations, setLocations] = useState([])

    const handleNameChange = (event) => {
        const value = event.target.value
        setName(value)
    }

    const handleStartChange = (event) => {
        const value = event.target.value
        setStarts(value)
    }

    const handleEndChange = (event) => {
        const value = event.target.value
        setEnds(value)
    }

    const handleDescriptionChange = (event) => {
        const value = event.target.value
        setDescription(value)
    }

    const handleMaxPresentationChange = (event) => {
        const value = event.target.value
        setMaxPresentations(value)
    }

    const handleMaxAttendeesChange = (event) => {
        const value = event.target.value
        setMaxAttendees(value)
    }

    const handleLocationChange = (event) => {
        const value = event.target.value
        setLocation(value)
    }


    const fetchData = async () => {
        const url = 'http://localhost:8000/api/locations/';

        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            setLocations(data.locations)
        }
    }


    const handleSubmit = async (event) => {
        event.preventDefault()

        const data = {}

        data.name = name
        data.starts = starts
        data.ends = ends
        data.description = description
        data.max_presentations = maxPresentations
        data.max_attendees = maxAttendees
        data.location = location

        const locationUrl = 'http://localhost:8000/api/conferences/';

        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        }
    
        const response = await fetch(locationUrl, fetchConfig);
        if (response.ok) {
            const newConference = await response.json();
            console.log(newConference)

            setName('')
            setStarts('')
            setEnds('')
            setDescription('')
            setMaxPresentations('')
            setMaxAttendees('')
            setLocation('')
        }
    }

    useEffect(() => {
        fetchData()
    }, []);

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Create a new conference</h1>
                    <form onSubmit={handleSubmit} id="create-conference-form">
                        <div className="form-floating mb-3">
                            <input onChange={handleNameChange} value={name} placeholder="Name" required type="text" name="name" id="name" className="form-control" />
                            <label htmlFor="name">Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleStartChange} value={starts} placeholder="Starts" required type="date" name="starts" id="starts" className="form-control" />
                            <label htmlFor="starts">Starts</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleEndChange} value={ends} placeholder="Ends" required type="date" name="ends" id="ends" className="form-control" />
                            <label htmlFor="ends">Ends</label>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description</label>
                            <textarea onChange={handleDescriptionChange} value={description} required type="text" name="description" id="description" className="form-control"></textarea>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleMaxPresentationChange} value={maxPresentations} placeholder="Maximum presentations" required type="number" name="max_presentations" id="max_presentations" className="form-control" />
                            <label htmlFor="max_presentations">Maximum presentations</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleMaxAttendeesChange} value={maxAttendees} placeholder="Maximum attendees" required type="number" name="max_attendees" id="max_attendees" className="form-control" />
                            <label htmlFor="max_attendees">Maximum attendees</label>
                        </div>
                        <div className="mb-3">
                            <select onChange={handleLocationChange} value={location} required id="location" name="location" className="form-select">
                                <option value="">Choose a location</option>
                                {locations.map(location => {
                                    return (
                                        <option key={location.id} value={location.id}>
                                            {location.name}
                                        </option>
                                    )
                                })}
                            </select>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>    
            </div>
        </div>
    )
}

export default ConferenceForm