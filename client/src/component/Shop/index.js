import React from "react";
import PageTop from "../utils/page_top";
import CollapseCheckbox from "../utils/collapseCheckbox";
import CollapseRadio from "../utils/collapseRadio";

import { frets, price } from "../utils/Form/fixed_categories";

import { connect } from "react-redux";
import { getBrands, getWoods } from "../../action/product_action";

class Shop extends React.Component {
	state = {
		grid: "",
		limit: 6,
		skip: 0,
		filters: {
			brand: [],
			frets: [],
			wood: [],
			price: [],
		},
	};

	componentDidMount() {
		this.props.dispatch(getBrands());
		this.props.dispatch(getWoods());
	}

	handlePrice = (value) => {
		const data = price;
		let array = [];

		for (let key in data) {
			if (data[key]._id === parseInt(value, 10)) {
				array = data[key].array;
			}
		}

		return array;
	};

	handleFilters = (filters, category) => {
		const newFilters = { ...this.state.filters };
		newFilters[category] = filters;

		if (category === "price") {
			let priceValues = this.handlePrice(filters);
			newFilters[category] = priceValues;
		}

		this.setState({
			filters: newFilters,
		});
	};

	render() {
		const products = this.props.products;

		return (
			<div>
				<PageTop title="Browse Products" />
				<div className="container">
					<div className="shop_wrapper">
						<div className="left">
							<CollapseCheckbox
								initState={true}
								title="Brands"
								list={products.brands}
								handleFilters={(filters) =>
									this.handleFilters(filters, "brand")
								}
							/>
							<CollapseCheckbox
								initState={false}
								title="Frets"
								list={frets}
								handleFilters={(filters) =>
									this.handleFilters(filters, "frets")
								}
							/>
							<CollapseCheckbox
								initState={false}
								title="Wood"
								list={products.woods}
								handleFilters={(filters) =>
									this.handleFilters(filters, "woods")
								}
							/>
							<CollapseRadio
								initState={true}
								title="Price"
								list={price}
								handleFilters={(filters) =>
									this.handleFilters(filters, "price")
								}
							/>
						</div>
						<div className="right">right</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		products: state.products,
	};
};

export default connect(mapStateToProps)(Shop);
