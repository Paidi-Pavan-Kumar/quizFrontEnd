

import React from 'react';

function Home() {
  const p1 = process.env.PUBLIC_URL + '/bgimg3.png';

  return (
    <div  className="container-fluid mt-5">
        <div className="mb-2">
          <div style={{maxWidth:'90%'}} className="form-container mx-auto text-center">
            <img className="logo-img img-fluid" src={p1} alt="logo" style={{maxWidth:"300px",maxHeight:"300px"}} />
            <h5><i>Your go-to platform for fun and engaging quizzes!</i></h5>
          </div>
        </div>
      <div className="row mx-auto">
        <div className="col-md-6 mb-5 mt-5">
          <div className="card">
            <div className="card-header text-light text-center bg-primary">
              <b>About Us</b>
            </div>
            <div className="card-body">
              Welcome to quizOquiz! quizOquiz is designed to make learning, testing your knowledge, and having a great time incredibly easy and enjoyable.
              <br/><br/>Our mission is to provide a platform that empowers individuals to learn, explore, and test their knowledge in an interactive and entertaining way. We envision a world where learning is accessible, enjoyable, and rewarding for everyone.
              <br/><br/>Your privacy and data security are our top priorities. Quizoquiz complies with strict data protection regulations and uses advanced security measures to safeguard your information.
            </div>
          </div>
        </div>

        

        <div className="col-md-6 mb-5 mt-5">
          <div className="card">
            <div className="card-header text-light text-center bg-primary">
              <b>Developed By</b>
            </div>
            <div className="card-body">
              <div className="row">
                             <div className="mb-4">
                                 <center>
                                     <b>Harshith</b><br/>
                                     <a href="https://www.linkedin.com/in/harshith-gamini-9990b4250/" target="_blank"><i className="fab fa-linkedin" style={{marginRight:"5px"}}></i></a>
                                     <a href="https://github.com/Harshith-Gamini" target="_blank"><i className="fa-brands fa-github" style={{marginRight:"5px"}}></i></a>
                                     <a href="https://www.instagram.com/harshith.g_12/?utm_source=qr" target="_blank"><i class="fa-brands fa-instagram"></i></a>
                                 </center>
                             </div>
                             <div className="mb-3">
                                 <center>
                                     <b>Chandan</b><br/>
                                     <a href="https://www.linkedin.com/in/k-sai-chandan-2k9876rt/" target="_blank"><i className="fab fa-linkedin" style={{marginRight:"5px"}}></i></a>
                                     <a href="https://github.com/Chandan9081" target="_blank"><i className="fa-brands fa-github" style={{marginRight:"5px"}}></i></a>
                                     <a href="https://instagram.com/chandan_90._._35?igshid=N3p5dG81YWNtMXJm" target="_blank"><i class="fa-brands fa-instagram"></i></a>
                                 </center>
                             </div>
                             <div className="mb-3">
                                 <center>
                                     <b>Sumanth</b><br/>
                                     <a href="https://www.linkedin.com/in/leelasumanth-dharmana" target="_blank"><i className="fab fa-linkedin" style={{marginRight:"5px"}}/></a>
                                     <a href="https://github.com/Leela-Sumanth-Dharmana" target="_blank"><i className="fa-brands fa-github" style={{marginRight:"5px"}}></i></a>
                                     <a href="https://instagram.com/leelasumanthdharmana?igshid=MWxzeGY3aHFoejViOA==" target="_blank"><i class="fa-brands fa-instagram"></i></a>
                                 </center>
                             </div>
                             <div className="mb-3">
                                 <center>
                                     <b>Satish</b><br/>
                                     <a href="https://www.linkedin.com/in/satish-pulleti-b35238235/" target="_blank"><i className="fab fa-linkedin" style={{marginRight:"5px"}}></i></a>
                                     <a href="https://github.com/SatishPulleti" target="_blank"><i className="fa-brands fa-github" style={{marginRight:"5px"}}></i></a>
                                     <a href="https://instagram.com/pulletisatish1633?igshid=aG53ZWpqcXozNndm" target="_blank"><i class="fa-brands fa-instagram"></i></a>
                                 </center>
                             </div>
                             <div className="mb-3">
                                 <center>
                                     <b>Netaji</b><br/>
                                     <a href="https://www.linkedin.com/in/netaji-sai-suru-05b941234" target="_blank"><i className="fab fa-linkedin" style={{marginRight:"5px"}}></i></a>
                                     <a href="https://github.com/Netaji-Sai" target="_blank"><i className="fa-brands fa-github" style={{marginRight:"5px"}}></i></a>
                                     <a href="https://instagram.com/this_is_me_netaji?igshid=b3V5c2NhM2FyZHBi" target="_blank"><i class="fa-brands fa-instagram"></i></a>
                                 </center>
                             </div>
                         </div>
                         
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
