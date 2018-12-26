import React from 'react'
import ReactDOM from 'react-dom';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Button from 'react-bootstrap/lib/Button';
import axios from 'axios';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

const peopleArray = [
    {
        name: 'Marco',
        surname: 'Soares',
        country: 'Portugal',
        birthday: '10/15/1995'
      }
    ];
    
    class Form extends React.Component {

      constructor() {
        super();
        this.state = {
          countries: [],
          people: peopleArray
        };
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleSubmit(e) {


        e.preventDefault();
        const
        { people } = this.state,
        name = e.target.name.value,
        surname = e.target.surname.value,
        country = e.target.country.value,
        birthday = e.target.birthday.value;

        var date = e.target.birthday.value.split("/");
        var years = 2018 - parseInt(date[2]);
        var temp = "Hello "+ e.target.name.value + " " + e.target.surname.value + ", from " + e.target.country.value + " on day " + date[1] + " of " + date[0] + " you will have " + years + " years old!";
        alert(temp); 

        this.setState({
          people: [...people, {
            name,
            surname,
            country,
            birthday
          }]
        }, () => {          
        });
      }

      componentDidMount() {
        axios.get(`https://restcountries.eu/rest/v2/all`)
            .then(res => {
              const countries = res.data;
              this.setState({ countries });
            })
      }
    
      render() {
        const { people } = this.state;
        console.log('message',this.state.people);
        return (   
          <div>
            <h2>React exercise</h2>
            <table>
                <th>

                
            <form onSubmit={this.handleSubmit}>
    <FieldGroup
      id="formControlsName"
      refs="name"
      type="text"
      label="Name"
      name="name"
      placeholder="name here"
    />
    <FieldGroup
      id="formControlsSurname"
      refs="surnamename"
      type="text"
      label="Surname"
      name="surname"
      placeholder="surname here"
    />

    <FormGroup controlId="formControlsSelectCountries">
      <ControlLabel>Countries </ControlLabel>
      <FormControl componentClass="select" name="country">
      { this.state.countries.map(country => <option key={country.name}>{country.name}</option>)}
      </FormControl>
    </FormGroup>

    <FieldGroup
      id="formControlsBirthday"
      refs="birthday"
      type="text"
      label="Birthday"
      name="birthday"
      placeholder="mm/dd/yyyy"
    />

    <Button type="submit">Save</Button>
      </form>

      </th> 
      <th>
      <h3>Existing People</h3>
      <br></br>
      <ul>
              {people.map((people) => 
               <li>{`Name: ${people.name} ${people.surname} | Country: ${people.country} | Birthday: ${people.birthday}`}</li>
              )}
            </ul>
            </th>
            </table>
          </div>
        ) 
      }
    }

    function FieldGroup({ id, label, help, ...props }) {
        return (
          <FormGroup controlId={id}>
            <ControlLabel>{label}</ControlLabel>
            <FormControl {...props} />
            {help && <HelpBlock>{help}</HelpBlock>}
          </FormGroup>
        );
      } 
    
    ReactDOM.render(<Form />, document.getElementById('root'));

