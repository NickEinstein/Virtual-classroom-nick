import { useState, useEffect } from 'react';

export default function Inquiry() {
  return (
    <div className="container">
      <div className="mt-5 col-md-7 col-lg-7">
        <form>
          <div className="row">
            <div className="col-md-7 col-lg-7">
              <input type="text" className="form-control" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}