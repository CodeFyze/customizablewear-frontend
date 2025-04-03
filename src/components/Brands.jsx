import {motion} from 'motion/react'

const brands = [
  { name: "Bailly", img: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACoCAMAAABt9SM9AAAAhFBMVEX+/v4AAAD///97e3uHh4ft7e1AQEC2trb4+PhdXV3Ozs7w8PDz8/PDw8Pq6uq5ubmvr6+Tk5Obm5vJycnY2Nje3t6lpaWwsLBzc3MlJSWQkJBPT083Nzdubm5jY2NHR0crKytYWFgdHR0vLy86OjoNDQ0UFBRCQkJ/f38mJiYeHh5LS0tmkBXpAAAJ0UlEQVR4nO2diXbiOBBFrcIkDmvCYghgIGyB5P//b7RbVgkckvR0W9I9Z2YaLDztd7Q8lUpykkQikUgkEolEIpFIJBKJRDhwlb/9N2sYjdbrei34bmUAcotug9XK2jUMsntveVusXnPFgsebT8YY3vt0Uax77hnFuuOeUaw77nnzdg3u4P+IWIt0/vTqutVq3UqzKFb1pozu8KF6n2KcNdyXwqxWrMfvPR6VJTWlajdaJ0G7M34cFacrQm1G/U77u88I8GFUz8YrlWgDPz27tBr9rN3Ak7pR3wutmFri34NPLFb7Z88IqsIu/JCqBGCNxLq/b6/ccSxv8+FBd2WToeH+FY/ztfNuQxg1HObQ7FiDCxiiqpXaDwnp4eE279up+BE8q7s02IdeBQA7SXtykrnGgSp7+RO4yC/mHmpFxXpGTz6qPugXPCxrdLyo6rHIxEexaMeC/Nax2mvBsl4s2ej0ePHpX+/OgRF69GfzSaFdr9VaajVVX/jhRzGAu6RTRSwsJqIvxdJzHU+1oo/4gh7e9FowzBdPqIRiv05HeS5LatlHvmqVQA9JcDBrBnNRWcul1Oesa5qscqz49tTy36cSKRCMkdd6czW+amuDlbzgpW+QwADXGSRWjsrY7gA61654BczrlUDd/AvSU/mGjc9aGUO+Zm2LdbBL2P1SWT9/NhX/53EEH6bV7gjJ+YYq1kJeOf2Pf/G/AUyQWNVOGtsLu/qAXt/x1zdIHFOadsU9bO3LdiCnnEF67BsE5QxYY0ZqcM1roVaoAlk++wYJvCO1jEgNoGh9J0zfIIA+Esvse+xrH6hiFfLKg7fTQgPcKx113hFW0jZZZWjimyuOzcIR4tORGuwsBrZYarTc+Rd5d4KXLmSLwjPtpdXWyggi8vV+4pj9SS+Fl/tnV32Dj+sUDgD14uQgxUImzF7SgI28UIShlTMkyiM1OChhS1LaMNtR+AsOAi65WEjEvi2Wilq8h+AbBI4gIHOY2FTYWmmVg/ANAugisdbgmOrYS9a66h0D8Q0cwJH2KeD6NrUlUSlZ3iXO3ATHl+mEeWd9dbArlk6X8D7eUEHP8Ep6Hfub3BZLJXkF4xsEjvjyC2qaVv0pfxOObxAAWk49Ha0v7Hiy9g0PgWnlii/b2PFkPYQG5BskeuJyFSueXFrWcAypwhEErHK2tIIwfYMALxBWqfbiUIprh7hCwJFkanKpalVGJNbhtUJ3kqnBi5ULEqxvEDiSTA2sxqYnSKsgtaLYzsrAyq4p4w127DQQwBFf1lheqix69w50PwBHkqmmZ42Fqn8L0TcIdD4Mwpoql4v+IfoGgSPJVGJlT+rcSTubKyRwaoMkxhswjiRTjhVP1jHUfcBaOZNMGVY2oB4InsMWCwcBCVvoqhZSvuGYhTjVKXEkmaJ4Muzl9wsP92HegzMIWI0nR9+gceyoeLIM6ZPz+xABtKhjtcJyxERbV4LDkZ9cNQjaNwQbbyhxWS0zH6RMUArbN3BcWzKXplg66tXgE4x+C9wKSSVrW2+XQwcbhIejfyfmfLm8HrxvuDrf0cpo0xp9g2uTOUctGkbfYHB1PUyd36DCg6uwZ4Uc145ojtqioj5H33A1nkWkUSgT4wNdpzBxnPSg4HMevV0u+gYqhp0ZWcKW78uQBMouDQ+3yZLQOY9Opoy+4arJEmwg+gaDW4ushK3kqB7tUu8bvH/ZQM3hYk/6vEg7bdlxq9HbE2Vp71/xh7rDxfR6db1vUKu13kYmbpisKvW+QTVYf096uGGyqtT6Bt35+VuxbpisCuh8FXwrGUD0N8UGmyzXEiLBmw4xqsfyN+SFTVZysb9hfNT6AbWkgQ4X8QacbtRyW4la36AHCm8rluOM1wnodXqT2k5bBVM93iuGzqTZgjMUeK7VSu0m8PdsGmyycucu6XrfkEmf7/FkG5sslg2Ce61lbcVSCfL+VqwEba8QbgpVrbpXLuhGiI6l9Ad85pjYXWj3WtuaQEIQURy8R1oMevaAWOMbIFHF7c3nHoFNll4orFatmnd/lZuHPT6FE+/MLLvnvkFNJndZP7f+aoUPwTByr778Yk0w2rLH25/wHLo+Fopv0itjh0dftQLX2yzuntYBjI8/0vqfR7xAboY3R9eHrCq3Ya+IqgynvT/1N/7/0T1QbzpcOE8o6H/l7URGT9avhr48Ov8P8vTcKtabG1ui03soHuyf+xNNvr5P7rfwKBHi1ube38GjoB+gVvPLeHQg9RdO6PkhHmXYXN2s+lv4tBMYzq0/ytyjipV86QWPP+JvP2AkEolEIpFIJBIJnesTk69MWeS8xpzeqD/6M9/R75yFrNtTD6yviH+ybgJ2aasUng4C9Lr8TzBA/7NmAu2jTPgYs0W+B5ZLCwcerYPnU5asFpD01oSceCno7kSEmF6bLmWpj162WnR2+9Vhv1/t9/vDar/rU6XSE/1Z2gMW4hciweTY6LPIoM23oLI3LmwXz6N3sqYfRNoZjEiWkBbAiqTP7+LINViL5Aa4XGCnSvVoqWnReiMFi8gUZNMqOmyVtsjzOdvgAzO5V4B+2XyxgO10XvDmM2OH/VbFmvASQ77jhD4uz/9j/5Fi5Vws+tMh4a+SzqgybLvYfsA+DVZkyna7ip2cXohFBWnJlpKTPhKLvb5e9VUXlvQABcngwxBrTu/xyNcloMuqESzlhnP68ZOKtRT11wexWJ662kzPlKqKlaxIrhOLqDYTSLpMW7tmGWLRiqU26cALGdArBcsM8USsjT63CNY7u8/q0q4/lcuktJUVQK9ModpnWWL1dYYSFaj/SIs/sfrph1gH/XZsmBO7ZtEHLsi2JxP/WrSL39HiN8Ua6hUd1or5pzfavn0Qix2tpg3UYWXXLOAH48vMP/rweYcdrHyzGXb0fh76y84jl25DOhMPxBLduvg8JSm88sMi4UwSJkM2YGp9qoYKm0NB2H8vG+44U5dYiU67oV19MhP17IGMGi/WjI33p1ObW4dsRR+5IMzKw4kOfFSGzZF92KuGyjLhF2JE7LJKtxelrNFwRM0Cr5I5LSzEguzQ8ANy2bjVHgzYqvQwg2z8ypKLJuStC9mZNTYqw4y9U+DFOD5F5C7IUim7wHq2iljsVJY5NVqDFq1iUqwEetvGi8UYwPSdkB0hryxbnSUkn0RSFXNQPL10rqd1kMrtA4/8FynwEZIdtMLFastkLLl/+sxmRLK7p0I2OhmeViZGRhvMJE9HY2lNB3ma8wccT5k9enkxagRMVf9GS43KUoO+sBdjUY2g+7hYzNpgXKE/bfaWFB0lqKwe6z+isAv6rVkq0R/0nRPjStOjDl/je48YgDCRSCQSiUQikUgkEolEQuE/4m9v+e8Al+0AAAAASUVORK5CYII=" },
  { name: "Walmart", img: "/images/walmart.png" },
  { name: "Deviant Art", img: "/images/deviantart.png" },
  { name: "Velasca", img: "/images/velasca.png" },
  { name: "Asos", img: "/images/asos.png" },
  { name: "Etsy", img: "/images/etsy.png" },
];

const BrandCarousel = () => {
    
  return (
    <div className='my-8'>
        <h1 className="text-2xl md:text-3xl text-start mt-2 font-bold mb-4 text-gray-900">
        We Work <span className='text-[#002DA1]'>  with</span>
          </h1>
   
    <div className="overflow-hidden relative w-full py-4 bg-black">
  
        

      <motion.div
        className="flex space-x-6"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
      >
        {[...brands, ...brands].map((brand, index) => (
          <div key={index} className="min-w-[150px] h-24 flex items-center justify-center bg-white shadow-md rounded-md">
            <img src={brand.img} alt={brand.name} className="h-12 object-contain" />
          </div>
        ))}
      </motion.div>
    </div>
    </div>
  );
};

export default BrandCarousel;
