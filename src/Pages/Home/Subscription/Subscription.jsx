import toast from 'react-hot-toast';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import './subscription.css'

const Subscription = () => {


    const axiosSecure = useAxiosSecure();

    const handleSubmit = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const currentTime = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric' });

        // Get the current date and format it as "YYYY-MM-DD"
        const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
        const date = new Date().toLocaleDateString('en-US', options);


        const newSubscriber = {email,currentTime, date }
        // console.log(newSubscriber);
        axiosSecure.post('/subscribe', newSubscriber)
        .then(res => {
            console.log(res.data);
            if (res.data.insertedId) {
                toast.success('Great! Subscribe Successfully!')

                //refetch post to update the data 
                // refetch();
            }
        })
    }


    return (
        <div>
            <h1 className='my-10 text-xl font-bold text-center md:text-4xl'>Subscribe For More Update</h1>

            <div class="subscribe">
                <p>SUBSCRIBE</p>
                <form onSubmit={handleSubmit}>
                  <input placeholder="Your e-mail" class="subscribe-input" name="email" type="email" required/>
                 
                  <button type="submit" class="submit-btn">SUBMIT</button>
                </form>
                <br />
               
            </div>

        </div>
    );
};

export default Subscription;