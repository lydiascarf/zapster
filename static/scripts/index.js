const pseudoAnchorAttributes = `class="button" href="javascript:void(0);"`
const frames = {
  '/': {
    html: `
      <div class="column fade-in">
        <h3></h3>
        <a href="https://www.yocale.com/widget/a-business">I'm ready to book</a>
        <a data-slug="/contact" ${pseudoAnchorAttributes}>I have a question</a>
      </div>
    `,
  },
  // '/returning': {
  //   html: `
  //     <div class="column fade-in">
  //       <h3>Have you had electrolysis or laser before?</h3>
  //       <a data-slug="/contact" ${pseudoAnchorAttributes}>I have</a>
  //       <a data-slug="/area" ${pseudoAnchorAttributes}>I have not</a>
  //     </div>
  //   `,
  // },
  // '/area': {
  //   html: `
  //     <div class="column fade-in">
  //       <h3>Are you looking to remove body hair, facial hair, or both?</h3>
  //       <a data-slug="/color" ${pseudoAnchorAttributes}>Body Hair</a>
  //       <a data-slug="/book-consultation" ${pseudoAnchorAttributes}>Facial Hair</a>
  //       <a data-slug="/book-consultation" ${pseudoAnchorAttributes}>Both</a>
  //     </div>
  //   `,
  // },
  // '/color': {
  //   // if body and black or brown hair, laser; else, consultation
  //   html: `
  //     <div class="column fade-in">
  //       <h3>Is the body hair you'd like to remove black or brown?</h3>
  //       <a data-slug="/book-laser" ${pseudoAnchorAttributes}>It is black or brown</a>
  //       <a data-slug="/book-consultation" ${pseudoAnchorAttributes}>It is not black or brown</a>
  //     </div> 
  //   `
  // },
  '/contact': {
    html: `
      <div class="column fade-in">
        <a href="https://www.yocale.com/widget/a-business">Book us</a>
        <a href="/blog">Check out the blog</a>
        <a href="mailto:transcend.electrolysis@gmail.com?subject=Client%20Question" target="_blank" rel="noopener noreferrer" id="button-email">Email us</a>
        <a href="tel:+12157983100">215-798-3100</a>
        <a href="tel:+12679274247">267-ZAP-HAIR</a>
        <p>Flexible Hours By Appointment, Including Evenings and Weekends</p>
        <p>1601 Walnut St, Ste 501, Philadelphia, PA 19102</p>
      </div>
    `
  },
  // '/book-consultation': {
  //   html: `
  //     <div class="column fade-in">
  //       <h3>It sounds like you could use a consultation!</h3>
  //       <a href="https://www.yocale.com/widget/a-business">Book us</a>
  //     </div>
  //   `
  // }
};


const Assistant = function _Assistant() {
  if (Assistant.state?.page && frames[Assistant.state.page].html) {
    return frames[Assistant.state.page].html;
  }

  return frames['/contact'].html;
};

const actions = {
  setPage: (value) => {
    if (frames[value].html) {
      setState(() => (Assistant.state.page = value))
    }
  }
};

Assistant.state = {
  page: '/',
  ...actions,
};

const setState = (callback) => {
  callback();
  updateTree();
  // localStorage.setItem("app", JSON.stringify(Assistant.state));
};

const updateTree = () => {
  document.getElementById("assistant").innerHTML = Assistant();

  const buttons = Array.from(document.getElementsByClassName('button'))
  buttons.forEach(button => {
    if (button.dataset.slug) {
      button.addEventListener("click", () =>
        Assistant.state.setPage(button.dataset.slug)
      )
    }
  })
};

updateTree();