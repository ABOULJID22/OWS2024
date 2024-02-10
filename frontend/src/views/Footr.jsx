import { Footer } from "flowbite-react";
import { BsFacebook, BsGithub, BsInstagram, BsTwitter } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function Footr() {
  return (
    <div>
      <Footer className="bg-gray-900 text-white p-1 mt-4">
        <div className="container mx-auto py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            <div className="mb-8"><Link to="/Home">ABOULJID</Link></div>
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">About</h2>
              <ul>
                <li>
                  <Link to="/Home">Home</Link>
                </li>
                <li>
                  <Link to="#">Contact</Link>
                </li>

                <li>
                  <Link to="#">Friends</Link>
                </li>
              </ul>
            </div>
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-4">Follow us</h2>
              <ul>
                <li>
                  <Link to="#">Github</Link>
                </li>
                <li>
                  <Link to="#">Discord</Link>
                </li>
              </ul>
            </div>
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">Legal</h2>
              <ul>
                <li>
                  <Link to="#">Privacy Policy</Link>
                </li>
                <li>
                  <Link to="#">Terms & Conditions</Link>
                </li>
              </ul>
            </div>
          </div>
          <hr className="my-8 border-gray-00" />
          <div className="flex justify-between items-center">
            <p className="text-sm">&copy; ABOULJID™ 2024</p>
            <div className="flex space-x-4">
              <Link to="#" className="text-white">
                <BsFacebook />
              </Link>
              <Link to="#" className="text-white">
                <BsInstagram />
              </Link>
              <Link to="#" className="text-white">
                <BsTwitter />
              </Link>
              <Link to="#" className="text-white">
                <BsGithub />
              </Link>
            </div>
          </div>
        </div>
      </Footer>
    </div>
  );
}
